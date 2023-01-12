import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";

import type { CreatePlaceInput, PlaceEntity, UpdatePlaceInput } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreatePlacesGQL, DeletePlaceGQL, PlacesGQL, UpdatePlaceGQL } from "../../graphql/places";
import { PlaceDialogComponent } from "../../ui/place-dialog/layout/place-dialog.component";

@Injectable({ providedIn: "root" })
export class PlacesService {
	readonly placesQuery = this._placesGQL.watch();
	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	readonly actions: IAction<PlaceEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (place) => this.openUpdatePlaceDialog(place).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (place) => this.openDeletePlaceDialog(place).pipe(take(1)).subscribe()
		}
	];

	constructor(
		private readonly _placesGQL: PlacesGQL,
		private readonly _createPlaceGQL: CreatePlacesGQL,
		private readonly _updatePlaceGQL: UpdatePlaceGQL,
		private readonly _deletePlaceGQL: DeletePlaceGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreatePlaceDialog(data: AtLeast<CreatePlaceInput, "company">) {
		return this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((place) => Boolean(place)),
			switchMap((place: PlaceEntity) =>
				this.createPlace({ name: place.name, company: data.company, file: place.file?.id })
			)
		);
	}

	openUpdatePlaceDialog(data: AtLeast<PlaceEntity, "id">) {
		return this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((place) => Boolean(place)),
			switchMap((place: PlaceEntity) => this.updatePlace({ id: place.id, name: place.name, file: place.file?.id }))
		);
	}

	openDeletePlaceDialog(value: AtLeast<PlaceEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить заведение?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((place) => Boolean(place)),
			switchMap((place) => this.deletePlace(place.id))
		);
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
