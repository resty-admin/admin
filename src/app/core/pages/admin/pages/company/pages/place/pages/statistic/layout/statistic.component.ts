import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PlacesService } from "@features/places";
import { PlaceVerificationStatusEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { from, map, switchMap, take } from "rxjs";

import { StatisticPageGQL } from "../graphql";

@Component({
	selector: "app-statistic",
	templateUrl: "./statistic.component.html",
	styleUrls: ["./statistic.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent implements OnInit {
	private readonly _statisticPageQuery = this._statisticPageGQL.watch();

	readonly statisticPage$ = this._statisticPageQuery.valueChanges.pipe(map((result) => result.data));

	constructor(
		private readonly _statisticPageGQL: StatisticPageGQL,
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService
	) {}

	async ngOnInit() {
		await this._statisticPageQuery.setVariables({ placeId: this._routerService.getParams(PLACE_ID.slice(1)) });
	}

	changeStatus(status: PlaceVerificationStatusEnum) {
		const newStatus =
			status === PlaceVerificationStatusEnum.NotVerified
				? PlaceVerificationStatusEnum.Verified
				: PlaceVerificationStatusEnum.NotVerified;

		this._placesService
			.updatePlaceVerification(this._routerService.getParams(PLACE_ID.slice(1)), newStatus)
			.pipe(
				take(1),
				switchMap(() => from(this._statisticPageQuery.refetch()))
			)
			.subscribe();
	}
}
