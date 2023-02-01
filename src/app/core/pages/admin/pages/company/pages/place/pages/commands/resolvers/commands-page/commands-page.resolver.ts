import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { map, of } from "rxjs";

import type { CommandsPageQuery } from "../../graphql";
import { CommandsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CommandsPageResolver implements Resolve<CommandsPageQuery["commands"]["data"]> {
	constructor(private readonly _commandsPageGQL: CommandsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		return this._commandsPageGQL
			.fetch({
				filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
			})
			.pipe(map((result) => result.data.commands.data));
	}
}
