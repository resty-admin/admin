import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { AttributesPageQuery } from "../../graphql";
import { AttributesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class AttriburesPageResolver implements Resolve<AttributesPageQuery["attributeGroups"]["data"]> {
	constructor(private readonly _attributesPageService: AttributesPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._attributesPageService.attributesPageQuery.resetLastResults();

		return from(
			this._attributesPageService.attributesPageQuery.setVariables({
				filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
			})
		).pipe(switchMap(() => this._attributesPageService.attributeGroups$));
	}
}
