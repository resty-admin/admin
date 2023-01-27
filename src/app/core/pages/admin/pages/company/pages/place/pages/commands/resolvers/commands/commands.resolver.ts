import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { CommandsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CommandsResolver implements Resolve<any> {
	constructor(private _commandsPageGQL: CommandsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		const variables = {
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		};

		return this._commandsPageGQL.watch(variables).valueChanges.pipe(map((result) => result.data.commands.data));
	}
}
