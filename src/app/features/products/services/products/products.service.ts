import { Injectable } from "@angular/core";
import type { CreateProductInput, UpdateProductInput } from "@graphql";

import { CreateProductGQL, DeleteProductGQL, UpdateProductGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ProductsService {
	constructor(
		private readonly _createProductGQL: CreateProductGQL,
		private readonly _updateProductGQL: UpdateProductGQL,
		private readonly _deleteProductGQL: DeleteProductGQL
	) {}

	createProduct(product: CreateProductInput) {
		return this._createProductGQL.mutate({ product });
	}

	updateProduct(product: UpdateProductInput) {
		return this._updateProductGQL.mutate({ product });
	}

	deleteProduct(productId: string) {
		return this._deleteProductGQL.mutate({ productId });
	}
}
