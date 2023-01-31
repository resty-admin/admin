import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlacesService } from "@features/places";
import { PlaceDialogComponent } from "@features/places/ui/place-dialog/layout/place-dialog.component";
import type { PlaceEntity } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { PLACES_PAGE } from "../constants";
import { PlacesPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly placesPage = PLACES_PAGE;
	private readonly _placesPageQuery = this._placesPageGQL.watch();
	readonly places$ = this._activatedRoute.data.pipe(map((data) => data["places"]));

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _placesPageGQL: PlacesPageGQL,
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		this._placesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._placesPageQuery.refetch();
		});

		const companyId = this._routerService.getParams(COMPANY_ID.slice(1));

		await this._placesPageQuery.setVariables({
			filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
		});
	}

	async openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!company) {
			return;
		}

		const place: PlaceEntity | undefined = await lastValueFrom(
			this._dialogService.open(PlaceDialogComponent).afterClosed$
		);

		if (!place) {
			return;
		}

		const result = await lastValueFrom(
			this._placesService
				.createPlace({ name: place.name, company, address: place.address, file: place.file?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.placesPage),
						this._i18nService.translate("title", {}, this.placesPage)
					)
				)
		);

		if (!result.data?.createPlace) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, result.data.createPlace.id)
		);
	}
}
