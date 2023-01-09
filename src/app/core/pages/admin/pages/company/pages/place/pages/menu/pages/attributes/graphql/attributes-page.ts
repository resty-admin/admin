import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type AttributesPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AttributesPageQuery {
	__typename?: "Query";
	attributeGroups: {
		__typename?: "PaginatedAttributeGroups";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "AttributesGroupEntity";
					id: string;
					name: string;
					attributes?: { __typename?: "AttributesEntity"; id: string; name: string; price?: number | null }[] | null;
			  }[]
			| null;
	};
}

export const AttributesPageDocument = gql`
	query AttributesPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		attributeGroups(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
				attributes {
					id
					name
					price
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AttributesPageGQL extends Apollo.Query<AttributesPageQuery, AttributesPageQueryVariables> {
	override document = AttributesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
