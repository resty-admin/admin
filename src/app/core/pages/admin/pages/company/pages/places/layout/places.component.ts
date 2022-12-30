import { ChangeDetectionStrategy, Component } from "@angular/core";
import { COMPANY_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { PlacesService } from "../../../../../../../../features/places";

@Component({
	selector: "app-places",
	templateUrl: "./places.component.html",
	styleUrls: ["./places.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlacesComponent {
	places$ = this._placesService.places$;

	constructor(private readonly _routerService: RouterService, private readonly _placesService: PlacesService) {}

	openAddPlaceDialog() {
		const company = this._routerService.getParams(COMPANY_ID.slice(1));

		console.log(company);

		this._placesService.openCreateOrUpdatePlaceDialog({ company }).subscribe();
	}
}
