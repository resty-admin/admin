import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsPageService {
	readonly productsPageQuery = this._productsPageGQL.watch();

	readonly products$ = this.productsPageQuery.valueChanges.pipe(map((result) => result.data.products.data));

	constructor(private readonly _productsPageGQL: ProductsPageGQL) {}
}
