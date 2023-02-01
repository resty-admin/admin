import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

import { StatisticPageGQL } from "../../statistic/graphql";

@Component({
	selector: "app-wallet",
	templateUrl: "./wallet.component.html",
	styleUrls: ["./wallet.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent implements OnInit {
	private readonly _statisticPageQuery = this._statisticPageGQL.watch();
	readonly statistic$ = this._statisticPageQuery.valueChanges.pipe(map((result) => result.data.getPlaceStatistic));

	constructor(private readonly _statisticPageGQL: StatisticPageGQL, private readonly _routerService: RouterService) {}

	async ngOnInit() {
		await this._statisticPageQuery.setVariables({ placeId: this._routerService.getParams(PLACE_ID.slice(1)) });
	}
}
