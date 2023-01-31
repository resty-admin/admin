import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PlaceDialogComponent, PlacesService } from "@features/places";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { PLACES_PAGE } from "../constants";
import { PlacesPageService } from "../services";

@UntilDestroy()
@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly placesPage = PLACES_PAGE;
	readonly places$ = this._placesPageService.places$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _placesPageService: PlacesPageService,
		private readonly _placesService: PlacesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._placesService.changes$
			.pipe(
				untilDestroyed(this),
				switchMap(() => from(this._placesPageService.placesPageQuery.refetch()))
			)
			.subscribe();
	}

	openCreatePlaceDialog() {
		return this._dialogService
			.open(PlaceDialogComponent)
			.afterClosed$.pipe(
				filter((place) => Boolean(place)),
				switchMap((place) =>
					this._placesService
						.createPlace({
							name: place.name,
							company: this._routerService.getParams(COMPANY_ID.slice(1)),
							address: place.address,
							file: place.file?.id
						})
						.pipe(
							switchMap((result) =>
								from(this._placesPageService.placesPageQuery.refetch()).pipe(map(() => result.data?.createPlace))
							),
							this._toastrService.observe(this._i18nService.translate("createPlace"))
						)
				),
				take(1)
			)
			.subscribe(async (createdPlace) => {
				if (!createdPlace) {
					return;
				}

				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.PLACE.absolutePath
						.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
						.replace(PLACE_ID, createdPlace.id)
				);
			});
	}
}
