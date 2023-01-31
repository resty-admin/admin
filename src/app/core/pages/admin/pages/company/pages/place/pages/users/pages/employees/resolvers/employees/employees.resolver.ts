import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { EmployeesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class EmployeesResolver implements Resolve<any> {
	constructor(private _employeesPageGQL: EmployeesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		const data = {
			filtersArgs: [
				{ key: "place.id", operator: "=", value: placeId },
				{ key: "role", operator: "=", value: UserRoleEnum.Waiter }
			]
		};

		return this._employeesPageGQL.watch(data).valueChanges.pipe(map((result) => result.data.users.data));
	}
}
