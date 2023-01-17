import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { lastValueFrom, Subject, tap } from "rxjs";

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
			func: (place) => this.openUpdatePlaceDialog(place)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (place) => this.openDeletePlaceDialog(place)
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

	async openCreatePlaceDialog(data: AtLeast<CreatePlaceInput, "company">) {
		const place: PlaceEntity = await lastValueFrom(
			this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$
		);

		return lastValueFrom(this.createPlace({ name: place.name, company: data.company, file: place.file?.id }));
	}

	async openUpdatePlaceDialog(data: AtLeast<PlaceEntity, "id">) {
		const place: PlaceEntity = await lastValueFrom(
			this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$
		);

		await lastValueFrom(this.updatePlace({ id: place.id, name: place.name, file: place.file?.id }));
	}

	async openDeletePlaceDialog(value: AtLeast<PlaceEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить заведение?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this.deletePlace(value.id));
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
