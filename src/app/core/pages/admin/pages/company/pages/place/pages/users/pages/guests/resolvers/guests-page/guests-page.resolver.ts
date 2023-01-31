import { Injectable } from "@angular/core";
import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { GuestsPageQuery } from "../../graphql";
import { GuestsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class GuestsPageResolver implements Resolve<GuestsPageQuery["users"]["data"]> {
	constructor(private readonly _guestsPageService: GuestsPageService) {}

	resolve(activatedRouteSnaphost: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnaphost.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._guestsPageService.guestsPageQuery.resetLastResults();

		return from(
			this._guestsPageService.guestsPageQuery.setVariables({
				filtersArgs: [
					{ key: "place.id", operator: "=", value: placeId },
					{ key: "role", operator: "=", value: UserRoleEnum.Client }
				]
			})
		).pipe(switchMap(() => this._guestsPageService.guests$));
	}
}
