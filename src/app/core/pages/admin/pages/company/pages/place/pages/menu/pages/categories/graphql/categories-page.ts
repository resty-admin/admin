import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type CategoriesPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface CategoriesPageQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "CategoryEntity";
					id: string;
					name: string;
					products?:
						| {
								__typename?: "ProductEntity";
								id: string;
								name: string;
								description?: string | null;
								price: number;
						  }[]
						| null;
			  }[]
			| null;
	};
}

export const CategoriesPageDocument = gql`
	query CategoriesPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		categories(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
				products {
					id
					name
					description
					price
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CategoriesPageGQL extends Apollo.Query<CategoriesPageQuery, CategoriesPageQueryVariables> {
	override document = CategoriesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
