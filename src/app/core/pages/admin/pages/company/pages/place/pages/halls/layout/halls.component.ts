import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { HallsService } from "src/app/features/halls";
import { PLACE_ID } from "src/app/shared/constants";

import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { HallsPageGQL } from "../graphql/halls-page";

@UntilDestroy()
@Component({
	selector: "app-halls",
	templateUrl: "./halls.component.html",
	styleUrls: ["./halls.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallsComponent implements OnInit {
	private readonly _hallPageQuery = this._hallsPageGQL.watch();
	readonly halls$: Observable<any> = this._hallPageQuery.valueChanges.pipe(
		map((result) => result.data.halls.data),
		map((halls) => halls?.map((hall) => ({ ...hall, routerLink: hall.id })))
	);

	constructor(
		private readonly _hallsPageGQL: HallsPageGQL,
		private readonly _hallsService: HallsService,
		private readonly _routerService: RouterService
	) {}

	openCreateHallDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		return this._hallsService.createHall(place).subscribe();
	}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._hallPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
			});
	}
}
