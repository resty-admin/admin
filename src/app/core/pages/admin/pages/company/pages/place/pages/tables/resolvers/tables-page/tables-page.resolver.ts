import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { HALL_ID } from "@shared/constants";

import { TablesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesPageResolver implements Resolve<unknown> {
	constructor(private readonly _tablesPageGQL: TablesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const hallId = activatedRouteSnapshot.paramMap.get(HALL_ID.slice(1));

		if (!hallId) {
			return null;
		}

		return this._tablesPageGQL.fetch({
			filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
		});
	}
}
