import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { map } from "rxjs";
import type { UserRoleEnum } from "src/app/shared/enums";
import { UserStatusEnum } from "src/app/shared/enums";
import type { IActivatedRouteSnapshot } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { AuthService } from "../../services";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(private readonly _authService: AuthService, private readonly _routerService: RouterService) {}

	canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot<{ roles: UserRoleEnum[] }>) {
		const { data, fragment, queryParamMap } = activatedRouteSnapshot;

		return this._authService.getMe().pipe(
			map((user) => {
				if (user && user.status === UserStatusEnum.VERIFIED && (data.roles || []).includes(user.role)) {
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
