import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { ADMIN_ROUTES } from "@shared/constants";
import type { IActivatedRouteSnapshot } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";

@Injectable({ providedIn: "root" })
export class RoleGuard implements CanActivate {
	constructor(private readonly _routerService: RouterService) {}

	async canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot) {
		const isRoleInQuery = activatedRouteSnapshot.queryParams["role"];

		if (!isRoleInQuery) {
			await this._routerService.navigateByUrl(ADMIN_ROUTES.ROLE.absolutePath);
		}

		return isRoleInQuery;
	}
}
