import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { IProduct } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { PRODUCTS_ENDPOINTS } from "../../../../endpoints";
import { PRODUCT_QUERY, PRODUCTS_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsService {
	readonly productsQuery = this._apolloService.watchQuery<any>({
		query: PRODUCTS_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly products$ = this.productsQuery.valueChanges.pipe(map(({ data }) => data.products.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchProducts() {
		await this.productsQuery.refetch();
	}

	getProduct(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: PRODUCT_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.product));
	}

	createProduct(place: Partial<IProduct>) {
		return this._apiService.post<IProduct>(PRODUCTS_ENDPOINTS.CREATE_PRODUCT, place);
	}

	updateProduct(id: string, place: Partial<IProduct>) {
		return this._apiService.patch<IProduct>(PRODUCTS_ENDPOINTS.UPDATE_PRODUCT.replace(DYNAMIC_ID, id), place);
	}

	deleteProduct(id: string) {
		return this._apiService.delete(PRODUCTS_ENDPOINTS.DELETE_PRODUCT.replace(DYNAMIC_ID, id));
	}
}
