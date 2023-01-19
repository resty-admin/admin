import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../graphql";
export type ProductCategoriesQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ProductCategoriesQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?: { __typename?: "CategoryEntity"; id: string; name: string }[] | null;
	};
}

export type ProductAttributeGroupsQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ProductAttributeGroupsQuery {
	__typename?: "Query";
	attributeGroups: {
		__typename?: "PaginatedAttributeGroups";
		data?: { __typename?: "AttributesGroupEntity"; id: string; name: string }[] | null;
	};
}

export const ProductCategoriesDocument = gql`
	query ProductCategories($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductCategoriesGQL extends Apollo.Query<ProductCategoriesQuery, ProductCategoriesQueryVariables> {
	override document = ProductCategoriesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ProductAttributeGroupsDocument = gql`
	query ProductAttributeGroups($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		attributeGroups(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductAttributeGroupsGQL extends Apollo.Query<
	ProductAttributeGroupsQuery,
	ProductAttributeGroupsQueryVariables
> {
	override document = ProductAttributeGroupsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
