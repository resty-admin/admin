import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { Subject, tap } from "rxjs";

import type { CreatePlaceInput, UpdatePlaceInput } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import { CreatePlacesGQL, DeletePlaceGQL, UpdatePlaceGQL } from "../../graphql/places";

@Injectable({ providedIn: "root" })
export class PlacesService {
	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createPlaceGQL: CreatePlacesGQL,
		private readonly _updatePlaceGQL: UpdatePlaceGQL,
		private readonly _deletePlaceGQL: DeletePlaceGQL
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	createPlace(place: CreatePlaceInput) {
		return this._createPlaceGQL.mutate({ place }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updatePlace(place: UpdatePlaceInput) {
		return this._updatePlaceGQL.mutate({ place }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deletePlace(placeId: string) {
		return this._deletePlaceGQL.mutate({ placeId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
