import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type ProductPageQueryVariables = Types.Exact<{
	productId: Types.Scalars["String"];
}>;

export interface ProductPageQuery {
	__typename?: "Query";
	product: {
		__typename?: "ProductEntity";
		id: string;
		name: string;
		description?: string | null;
		price: number;
		file?: { __typename?: "FileEntity"; id: string; url: string } | null;
		category: { __typename?: "CategoryEntity"; id: string; name: string };
	};
}

export const ProductPageDocument = gql`
	query ProductPage($productId: String!) {
		product(id: $productId) {
			id
			name
			description
			price
			file {
				id
				url
			}
			category {
				id
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductPageGQL extends Apollo.Query<ProductPageQuery, ProductPageQueryVariables> {
	override document = ProductPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
