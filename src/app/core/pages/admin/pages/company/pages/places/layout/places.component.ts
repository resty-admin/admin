import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PlaceDialogComponent, PlacesService } from "@features/places";
import { UserRoleEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { PlacesPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	private readonly _placesPageQuery = this._placesPageGQL.watch();
	readonly places$ = this._placesPageQuery.valueChanges.pipe(map((result) => result.data.places.data));
	userRoleEnum = UserRoleEnum;

	constructor(
		readonly sharedService: SharedService,
		private readonly _placesPageGQL: PlacesPageGQL,
		private readonly _placesService: PlacesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(COMPANY_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async () => {
				await this._placesPageQuery.setVariables({
					filtersArgs: [{ key: "company.id", operator: "=", value: this._routerService.getParams(COMPANY_ID.slice(1)) }]
				});
			});

		this._placesService.changes$
			.pipe(
				untilDestroyed(this),
				switchMap(() => this._placesPageQuery.refetch())
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
							take(1),
							switchMap((result) => from(this._placesPageQuery.refetch()).pipe(map(() => result.data?.createPlace))),
							this._toastrService.observe(this._i18nService.translate("PLACES.CREATE"))
						)
				)
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
