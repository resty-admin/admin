import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { EmployeesPageQuery } from "../../graphql";
import { EmployeesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class EmployeesPageResolver implements Resolve<EmployeesPageQuery["users"]["data"]> {
	constructor(private readonly _employeesPageService: EmployeesPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._employeesPageService.employeesPageQuery.resetLastResults();

		return from(
			this._employeesPageService.employeesPageQuery.setVariables({
				filtersArgs: [
					{ key: "place.id", operator: "=", value: placeId },
					{ key: "role", operator: "=", value: UserRoleEnum.Waiter }
				]
			})
		).pipe(switchMap(() => this._employeesPageService.employees$));
	}
}
