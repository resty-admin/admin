import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsPageResolver implements Resolve<unknown> {
	constructor(private readonly _productsPageGQL: ProductsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		return this._productsPageGQL.fetch({
			filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
		});
	}
}
