import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../graphql";
export type ProductDialogQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ProductDialogQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?: { __typename?: "CategoryEntity"; id: string; name: string }[] | null;
	};
	attributeGroups: {
		__typename?: "PaginatedAttributeGroups";
		data?: { __typename?: "AttributesGroupEntity"; id: string; name: string }[] | null;
	};
}

export const ProductDialogDocument = gql`
	query ProductDialog($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
			}
			page
			totalCount
		}
		attributeGroups {
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
export class ProductDialogGQL extends Apollo.Query<ProductDialogQuery, ProductDialogQueryVariables> {
	override document = ProductDialogDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
