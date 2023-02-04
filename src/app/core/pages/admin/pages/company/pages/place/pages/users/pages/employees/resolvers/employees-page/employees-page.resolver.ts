import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";

import { EmployeesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class EmployeesPageResolver implements Resolve<unknown> {
	constructor(private readonly _employeesPageGQL: EmployeesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		return this._employeesPageGQL.fetch({
			filtersArgs: [
				{ key: "place.id", operator: "=", value: placeId },
				{ key: "user.role", operator: "=", value: UserRoleEnum.Waiter }
			]
		});
	}
}
