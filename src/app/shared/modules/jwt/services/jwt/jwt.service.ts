import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: "root" })
export class JwtService {
	constructor(private readonly _jwtHelperService: JwtHelperService) {}

	decodeToken<T>(token: string): T | null {
		return this._jwtHelperService.decodeToken<T>(token);
	}
}
