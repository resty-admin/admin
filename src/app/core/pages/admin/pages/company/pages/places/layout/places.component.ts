import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, take } from "rxjs";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { PlacesService } from "../../../../../../../../features/places";
import { DialogService } from "../../../../../../../../shared/ui/dialog";
import { PLACES_PAGE_I18N } from "../constants";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly placesPageI18n = PLACES_PAGE_I18N;
	readonly places$ = this._placesService.placesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService,
		private readonly _dialogService: DialogService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const companyId = this._routerService.getParams(COMPANY_ID.slice(1));

		await this._placesService.placesQuery.setVariables({
			filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
		});
	}

	openCreatePlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		if (!company) {
			return;
		}

		this._placesService
			.openCreatePlaceDialog({ company })
			.pipe(
				take(1),
				map((result) => result.data?.createPlace)
			)
			.subscribe(async (place) => {
				if (!place) {
					return;
				}

				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.PLACE.absolutePath.replace(COMPANY_ID, company).replace(PLACE_ID, place.id)
				);
			});
	}
}
