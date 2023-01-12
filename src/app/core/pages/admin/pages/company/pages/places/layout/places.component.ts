import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { PlacesService } from "../../../../../../../../features/places";
import { DialogService } from "../../../../../../../../shared/ui/dialog";

@UntilDestroy()
@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent implements OnInit {
	readonly places$ = this._placesService.placesQuery.valueChanges.pipe(map((result) => result.data.places.data));

	constructor(
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService,
		private readonly _dialogService: DialogService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(COMPANY_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (value) => {
				await this._placesService.placesQuery.setVariables({
					filtersArgs: [{ key: "company.id", operator: "=", value }]
				});
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
