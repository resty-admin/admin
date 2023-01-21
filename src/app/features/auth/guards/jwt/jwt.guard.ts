import { Injectable } from "@angular/core";
import type { CanActivate } from "@angular/router";
import { DYNAMIC_TOKEN } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import type { IActivatedRouteSnapshot } from "@shared/interfaces";
import { JwtService } from "@shared/modules/jwt";
import { RouterService } from "@shared/modules/router";

// Check if DYNAMIC_TOKEN of route is jwt
@Injectable({ providedIn: "root" })
export class JwtGuard implements CanActivate {
	constructor(private readonly _routerService: RouterService, private readonly _jwtService: JwtService) {}

	async canActivate(activatedRouteSnapshot: IActivatedRouteSnapshot) {
		const token = activatedRouteSnapshot.paramMap.get(DYNAMIC_TOKEN.slice(1));

		try {
			this._jwtService.decodeToken(token || "");
		} catch {
			await this._routerService.navigateByUrl(ADMIN_ROUTES.SIGN_IN.absolutePath);
			return false;
		}

		return true;
	}
}
