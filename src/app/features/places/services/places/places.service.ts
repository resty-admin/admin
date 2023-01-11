import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreatePlaceInput, UpdatePlaceInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreatePlacesGQL, DeletePlaceGQL, PlacesGQL, UpdatePlaceGQL } from "../../graphql/places";
import { PlaceDialogComponent } from "../../ui/place-dialog/layout/place-dialog.component";

@Injectable({ providedIn: "root" })
export class PlacesService {
	readonly placesQuery = this._placesGQL.watch();

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (place?: any) => this.openUpdatePlaceDialog(place).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (place?: any) => {
				if (!place) {
					return;
				}

				this.openDeletePlaceDialog(place).pipe(take(1)).subscribe();
			}
		}
	];

	constructor(
		private readonly _placesGQL: PlacesGQL,
		private readonly _createPlaceGQL: CreatePlacesGQL,
		private readonly _updatePlaceGQL: UpdatePlaceGQL,
		private readonly _deletePlaceGQL: DeletePlaceGQL,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService
	) {}

	openCreatePlaceDialog(data?: any) {
		return this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((place) => Boolean(place)),
			switchMap((place) => this.createPlace(place))
		);
	}

	openUpdatePlaceDialog(data: any) {
		return this._dialogService.open(PlaceDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((place) => Boolean(place)),
			switchMap((place) => this.updatePlace(place))
		);
	}

	openDeletePlaceDialog(place: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить заведение?",
				value: place
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((place) => Boolean(place)),
			switchMap((place) => this.deletePlace(place.id))
		);
	}

	createPlace(place: CreatePlaceInput) {
		return this._filesService.getFile(place.file).pipe(
			take(1),
			switchMap((file) => this._createPlaceGQL.mutate({ place: { ...place, file: file?.id } }))
		);
	}

	updatePlace(place: UpdatePlaceInput) {
		return this._filesService.getFile(place.file).pipe(
			take(1),
			switchMap((file) => this._updatePlaceGQL.mutate({ place: { ...place, file: file?.id } }))
		);
	}

	deletePlace(placeId: string) {
		return this._deletePlaceGQL.mutate({ placeId });
	}
}
