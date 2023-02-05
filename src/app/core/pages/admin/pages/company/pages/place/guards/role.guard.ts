import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { AuthService } from "@features/auth";
import type { UserRoleEnum } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import type { IActivatedRouteSnapshot } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot<{ roles: UserRoleEnum[] }>) {
		const { data, paramMap } = activatedRouteSnapshot;

		return this._authService.me$.pipe(
			map((user) => {
				if ((data.roles || []).includes(user!.role)) {
					return true;
				}

				this._routerService
					.navigateByUrl(
						ADMIN_ROUTES.SHIFT.absolutePath
							.replace(COMPANY_ID, paramMap.get(COMPANY_ID.slice(1)) || "")
							.replace(PLACE_ID, paramMap.get(PLACE_ID.slice(1)) || "")
					)
					.then();
				return false;
			})
		);
	}
}
