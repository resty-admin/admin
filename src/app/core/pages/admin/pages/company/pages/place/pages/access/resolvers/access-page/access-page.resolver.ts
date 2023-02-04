import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";

import { AccessPageGQL } from "../../graphql/access-page";

@Injectable({ providedIn: "root" })
export class AccessPageResolver implements Resolve<unknown> {
	constructor(private readonly _accessPageGQL: AccessPageGQL) {}

	resolve(activatedRouteSnapshit: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshit.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		return this._accessPageGQL.fetch({ placeId });
	}
}
