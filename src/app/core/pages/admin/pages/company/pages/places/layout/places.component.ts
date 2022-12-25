import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, switchMap, take } from "rxjs";
import { COMPANY_ID } from "src/app/shared/constants";
import type { IPlace } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PlacesService } from "../../../../../../../../shared/modules/places";
import { PlaceDialogComponent } from "../components";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent {
	places$ = this._placesService.places$;

	constructor(
		private readonly _placesService: PlacesService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService
	) {}

	openAddPlaceDialog() {
		this._dialogService
			.open(PlaceDialogComponent)
			.afterClosed$.pipe(
				take(1),
				filter((place) => Boolean(place)),
				switchMap((place: IPlace) =>
					this._placesService
						.createPlace({
							...place,
							company: this._routerService.getParams(COMPANY_ID.slice(1))
						} as unknown as any)
						.pipe(take(1), this._toastrService.observe("Заведение"))
				)
			)
			.subscribe(async () => {
				await this._placesService.refetchPlaces();
			});
	}
}
