import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";

import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { STATISTIC_PAGE_I18N } from "../constants";
import { StatisticPageGQL } from "../graphql/statistic-page";

@UntilDestroy()
@Component({
	selector: "app-statistic",
	templateUrl: "./statistic.component.html",
	styleUrls: ["./statistic.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {
	readonly statisticPageI18n = STATISTIC_PAGE_I18N;
	readonly cards = [
		{
			label: "Сотрудников",
			value: "15",
			icon: "user",
			routerLink: "../users"
		},
		{
			label: "Залов",
			value: "5",
			icon: "halls",
			routerLink: "../halls"
		},
		{
			label: "Клиетов",
			value: "5 000",
			icon: "group",
			routerLink: "../users"
		},
		{
			label: "Столов",
			value: "50",
			icon: "table",
			routerLink: "../halls"
		}
	];

	private readonly _statisticPageQuery = this._statisticPageGQL.watch();

	readonly statistic$ = this._statisticPageQuery.valueChanges.pipe(map((result) => result.data));

	readonly usersCount$ = this.statistic$.pipe(map((data) => data.users.totalCount));
	readonly hallsCount$ = this.statistic$.pipe(map((data) => data.halls.totalCount));
	readonly tablesCount$ = this.statistic$.pipe(map((data) => data.tables.totalCount));

	constructor(private readonly _routerService: RouterService, private readonly _statisticPageGQL: StatisticPageGQL) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._statisticPageQuery.setVariables({
					guestsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
					hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
					tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
				});
			});
	}
}
