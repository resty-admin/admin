import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { COMPANY_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { PlacesService } from "../../../../../../../../features/places";
import { PlacesPageGQL } from "../graphql/places-page";

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

	constructor(
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService,
		private readonly _placesPageGQL: PlacesPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(COMPANY_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (value) => {
				await this._placesPageQuery.setVariables({ filtersArgs: [{ key: "company.id", operator: "=", value }] });
			});
	}

	openAddPlaceDialog() {
		this._placesService
			.openCreateOrUpdatePlaceDialog({ company: this._routerService.getParams(COMPANY_ID.slice(1)) })
			.subscribe();
	}
}
