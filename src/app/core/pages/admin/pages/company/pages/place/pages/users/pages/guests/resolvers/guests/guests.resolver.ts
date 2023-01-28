import { Injectable } from "@angular/core";
import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { GuestsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class GuestsResolver implements Resolve<any> {
	constructor(private _guestsPageGQL: GuestsPageGQL) {}

	resolve(activatedRouteSnaphost: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnaphost.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._guestsPageGQL
			.fetch({
				filtersArgs: [
					// { key: "place.id", operator: "=", value: placeId },
					{ key: "role", operator: "=", value: UserRoleEnum.Client }
				]
			})
			.pipe(map((result) => result.data.users.data));
	}
}
