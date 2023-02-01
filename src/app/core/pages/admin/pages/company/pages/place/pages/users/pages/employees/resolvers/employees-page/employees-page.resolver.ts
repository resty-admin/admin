import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import { of } from "rxjs";

import type { EmployeesPageQuery } from "../../graphql";
import { EmployeesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class EmployeesPageResolver implements Resolve<ApolloQueryResult<EmployeesPageQuery> | null> {
	constructor(private readonly _employeesPageGQL: EmployeesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._employeesPageGQL.fetch({
			filtersArgs: [
				{ key: "place.id", operator: "=", value: placeId },
				{ key: "role", operator: "=", value: UserRoleEnum.Waiter }
			]
		});
	}
}
