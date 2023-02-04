import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { AuthService } from "@features/auth";
import { UserRoleEnum } from "@graphql";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { map, of, switchMap, tap } from "rxjs";

import { CompaniesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CompaniesGuard implements CanActivate {
	constructor(
		private readonly _authService: AuthService,
		private readonly _companiesGQL: CompaniesPageGQL,
		private readonly _routerService: RouterService
	) {}

	canActivate() {
		const accessRoles = new Set([UserRoleEnum.Admin, UserRoleEnum.Manager]);
		return this._authService.me$.pipe(
			map((user) => {
				if (user && accessRoles.has(user.role)) {
					return true;
				}

				return false;
			}),
			switchMap((roleAccess) =>
				roleAccess
					? of(true)
					: this._companiesGQL.fetch({}).pipe(
							map((result) => Boolean(result.data.companies.data?.length)),
							tap(async (companiesAccess) => {
								if (companiesAccess) {
									return;
								}
								await this._routerService.navigateByUrl(ADMIN_ROUTES.CONNECT_TO_PLACE.absolutePath);
							})
					  )
			)
		);
	}
}
