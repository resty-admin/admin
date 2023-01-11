import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../graphql";
export type AttributeGroupDialogQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AttributeGroupDialogQuery {
	__typename?: "Query";
	attributes: {
		__typename?: "PaginatedAttributes";
		page: number;
		totalCount: number;
		data?: { __typename?: "AttributesEntity"; id: string; name: string }[] | null;
	};
}

export const AttributeGroupDialogDocument = gql`
	query AttributeGroupDialog($filtersArgs: [FiltersArgsDto!], $skip: Int, $take: Int) {
		attributes(filtersArgs: $filtersArgs, skip: $skip, take: $take) {
			page
			totalCount
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
export class AttributeGroupDialogGQL extends Apollo.Query<
	AttributeGroupDialogQuery,
	AttributeGroupDialogQueryVariables
> {
	override document = AttributeGroupDialogDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
