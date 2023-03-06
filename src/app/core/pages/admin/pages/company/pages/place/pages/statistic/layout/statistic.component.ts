import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth";
import { PlacesService } from "@features/places";
import { PlaceVerificationStatusEnum, UserRoleEnum } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { map, switchMap, take } from "rxjs";

import { StatisticPageGQL } from "../graphql";

@UntilDestroy()
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
		private readonly _authService: AuthService,
		private readonly _statisticPageGQL: StatisticPageGQL,
		private readonly _routerService: RouterService,
		private readonly _placesService: PlacesService
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._statisticPageQuery.setVariables({ placeId });
			});
	}

	changeStatus(status: PlaceVerificationStatusEnum) {
		const newStatus =
			status === PlaceVerificationStatusEnum.NotVerified
				? PlaceVerificationStatusEnum.Verified
				: PlaceVerificationStatusEnum.NotVerified;

		this._authService.me$
			.pipe(
				switchMap((user) =>
					this._placesService.updatePlaceVerification(
						this._routerService.getParams(PLACE_ID.slice(1)),
						user?.role === UserRoleEnum.Manager ? PlaceVerificationStatusEnum.WaitingForApprove : newStatus
					)
				),

				take(1),
				switchMap(() => this._statisticPageQuery.refetch())
			)
			.subscribe();
	}
}
