import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class WalletResolver implements Resolve<any> {
	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return of(null);
	}
}
