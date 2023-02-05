import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PRODUCT_ID } from "@shared/constants";

import { ProductPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductPageResolver implements Resolve<unknown> {
	constructor(private readonly _productsPageGQL: ProductPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const productId = activatedRouteSnapshot.paramMap.get(PRODUCT_ID.slice(1));

		if (!productId || productId === "create") {
			return;
		}

		return this._productsPageGQL.fetch({ productId });
	}
}
