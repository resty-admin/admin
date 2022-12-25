import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import type { IActivatedRouteSnapshot } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import { ADMIN_ROUTES } from "src/app/shared/routes";

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
