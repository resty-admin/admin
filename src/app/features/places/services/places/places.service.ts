import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";

import type { CreatePlaceInput, UpdatePlaceInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/file";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { PlaceDialogComponent } from "../../components";
import { CreatePlacesGQL, DeletePlaceGQL, PlacesGQL, UpdatePlaceGQL } from "../../graphql/places";

@Injectable({ providedIn: "root" })
export class PlacesService {
	readonly places$ = this._placesGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		private readonly _placesGQL: PlacesGQL,
		private readonly _createPlaceGQL: CreatePlacesGQL,
		private readonly _updatePlaceGQL: UpdatePlaceGQL,
		private readonly _deletePlaceGQL: DeletePlaceGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	async refetch() {
		await this._placesGQL.watch({ skip: 0, take: 5 }).refetch();
	}

	openCreateOrUpdatePlaceDialog(data?: any) {
		return this._dialogService
			.openFormDialog(PlaceDialogComponent, { data })
			.pipe(switchMap((place) => (place.id ? this.updatePlace(place) : this.createPlace(place))));
	}

	openDeletePlaceDialog() {}

	createPlace(place: CreatePlaceInput) {
		return this._filesService.getFile(place.file).pipe(
			switchMap((file) => this._createPlaceGQL.mutate({ place: { ...place, file } })),
			take(1),
			this._toastrService.observe("Заведения"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updatePlace(place: UpdatePlaceInput) {
		return this._updatePlaceGQL.mutate({ place }).pipe(
			take(1),
			this._toastrService.observe("Заведения"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deletePlace(placeId: string) {
		return this._deletePlaceGQL.mutate({ placeId }).pipe(
			take(1),
			this._toastrService.observe("Заведения"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
