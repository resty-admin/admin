import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, shareReplay } from "rxjs";

import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { DASHBOARD_PAGE_I18N } from "../constants";
import { DashboardPageGQL } from "../graphql/dashboard-page";

@UntilDestroy()
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
	readonly dashboardPageI18n = DASHBOARD_PAGE_I18N;
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

	private readonly _dashboardPageQuery = this._dashboardPageGQL.watch();

	readonly dashboard$ = this._dashboardPageQuery.valueChanges.pipe(
		map((result) => result.data),
		shareReplay({ refCount: true })
	);

	readonly usersCount$ = this.dashboard$.pipe(map((data) => data.users.totalCount));
	readonly hallsCount$ = this.dashboard$.pipe(map((data) => data.halls.totalCount));
	readonly tablesCount$ = this.dashboard$.pipe(map((data) => data.tables.totalCount));

	constructor(private readonly _routerService: RouterService, private readonly _dashboardPageGQL: DashboardPageGQL) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._dashboardPageQuery.setVariables({
					guestsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
					hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
					tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
				});
			});
	}
}
