import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { CommandsPageQuery } from "../../graphql";
import { CommandsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class CommandsPageResolver implements Resolve<CommandsPageQuery["commands"]["data"]> {
	constructor(private readonly _commandsPageService: CommandsPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._commandsPageService.commandsPageQuery.resetLastResults();

		return from(
			this._commandsPageService.commandsPageQuery.setVariables({
				filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
			})
		).pipe(switchMap(() => this._commandsPageService.commands$));
	}
}
