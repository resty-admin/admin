import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { COMPANY_ID } from "src/app/shared/constants";
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
		return this._placesService.openCreatePlaceDialog().pipe(take(1)).subscribe();
	}
}
