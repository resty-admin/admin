import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type ProductsPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ProductsPageQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ProductEntity";
					id: string;
					name: string;
					description?: string | null;
					price: number;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
					category: { __typename?: "CategoryEntity"; id: string; name: string };
			  }[]
			| null;
	};
}

export const ProductsPageDocument = gql`
	query ProductsPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		products(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
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
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductsPageGQL extends Apollo.Query<ProductsPageQuery, ProductsPageQueryVariables> {
	override document = ProductsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
