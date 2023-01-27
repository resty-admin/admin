import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ProductsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsResolver implements Resolve<any> {
	constructor(private _placesPageGQL: ProductsPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.products.data));
	}
}
