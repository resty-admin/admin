import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PlacesService } from "@features/places";
import { PlaceVerificationStatusEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { from, switchMap, take } from "rxjs";

import { STATISTIC_PAGE } from "../constants";
import { StatisticPageService } from "../services";

@Component({
	selector: "app-statistic",
	templateUrl: "./statistic.component.html",
	styleUrls: ["./statistic.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticComponent {
	readonly statisticPage = STATISTIC_PAGE;

	readonly statisticPage$ = this._statisticPageService.statisticPage$;

	constructor(
		private readonly _statisticPageService: StatisticPageService,
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService
	) {}

	changeStatus(status: PlaceVerificationStatusEnum) {
		const newStatus =
			status === PlaceVerificationStatusEnum.NotVerified
				? PlaceVerificationStatusEnum.Verified
				: PlaceVerificationStatusEnum.NotVerified;

		this._placesService
			.updatePlaceVerification(this._routerService.getParams(PLACE_ID.slice(1)), newStatus)
			.pipe(
				take(1),
				switchMap(() => from(this._statisticPageService.statisticPageQuery.refetch()))
			)
			.subscribe();
	}
}
