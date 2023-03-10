import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import type { UserRoleEnum } from "@graphql";
import { UserStatusEnum } from "@graphql";
import { ADMIN_ROUTES } from "@shared/constants";
import type { IActivatedRouteSnapshot } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import { map } from "rxjs";

import { AuthService } from "../../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(private readonly _authService: AuthService, private readonly _routerService: RouterService) {}

	canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot<{ roles: UserRoleEnum[] }>) {
		const { data, fragment, queryParamMap } = activatedRouteSnapshot;

		return this._authService.me$.pipe(
			map((user) => {
				if (user && user.status === UserStatusEnum.Verified && (data.roles || []).includes(user.role)) {
					return true;
				}

				const url =
					queryParamMap.get("from") === "telegram"
						? ADMIN_ROUTES.TELEGRAM.absolutePath
						: ADMIN_ROUTES.SIGN_IN.absolutePath;

				this._routerService.navigate([url], { ...(fragment ? { fragment } : {}) }).then();

				return false;
			})
		);
	}
}
