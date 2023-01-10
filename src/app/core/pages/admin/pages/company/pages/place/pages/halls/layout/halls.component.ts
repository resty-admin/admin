import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { map } from "rxjs";
import { HallsService } from "src/app/features/halls";
import { PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { HallsPageGQL } from "../graphql/halls";

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

	readonly actions = this._hallsService.actions;

	constructor(
		private readonly _hallsService: HallsService,
		private readonly _routerService: RouterService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _hallsPageGQL: HallsPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._hallPageQuery.setVariables({ filtersArgs: [{ key: "place.id", operator: "=", value: placeId }] });
			});
	}

	openCreateHallDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._hallsService.openCreateOrUpdateHallDialog({ place }).subscribe();
	}

	openDeleteHallDialog(hall: any) {
		this._hallsService.openDeleteHallDialog(hall).subscribe();
	}
}
