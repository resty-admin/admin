import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { HALL_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { TablesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesResolver implements Resolve<any> {
	constructor(private _tablesPageGQL: TablesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const hallId = activatedRouteSnapshot.paramMap.get(HALL_ID.slice(1));

		if (!hallId) {
			return of(null);
		}

		const variables = {
			filtersArgs: [{ key: "hall.id", operator: "=", value: hallId }]
		};

		return this._tablesPageGQL.watch(variables).valueChanges.pipe(map((result) => result.data.tables.data));
	}
}
