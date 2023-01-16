import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { STATISTIC_PAGE_I18N } from "../constants";
import { StatisticPageGQL } from "../graphql/statistic-page";

@Component({
	selector: "app-statistic",
	templateUrl: "./statistic.component.html",
	styleUrls: ["./statistic.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {
	readonly statisticPageI18n = STATISTIC_PAGE_I18N;

	private readonly _statisticPageQuery = this._statisticPageGQL.watch();

	readonly statistic$ = this._statisticPageQuery.valueChanges.pipe(map((result) => result.data));

	readonly usersCount$ = this.statistic$.pipe(map((data) => data.users.totalCount));
	readonly hallsCount$ = this.statistic$.pipe(map((data) => data.halls.totalCount));
	readonly tablesCount$ = this.statistic$.pipe(map((data) => data.tables.totalCount));

	constructor(private readonly _routerService: RouterService, private readonly _statisticPageGQL: StatisticPageGQL) {}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		await this._statisticPageQuery.setVariables({
			guestsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
			hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
			tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
		});
	}
}
