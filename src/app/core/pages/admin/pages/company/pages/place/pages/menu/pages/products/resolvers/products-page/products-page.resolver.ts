import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { ProductsPageQuery } from "../../graphql";
import { ProductsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ProductsPageResolver implements Resolve<ProductsPageQuery["products"]["data"]> {
	constructor(private readonly _productsPageService: ProductsPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._productsPageService.productsPageQuery.resetLastResults();

		return from(
			this._productsPageService.productsPageQuery.setVariables({
				filtersArgs: [{ key: "category.place.id", operator: "=", value: placeId }]
			})
		).pipe(switchMap(() => this._productsPageService.products$));
	}
}
