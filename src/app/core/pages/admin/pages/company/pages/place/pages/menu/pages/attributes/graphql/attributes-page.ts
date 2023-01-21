import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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
					maxItemsForPick: number;
					attributes?:
						| {
								__typename?: "AttributesEntity";
								id: string;
								name: string;
								price: number;
								attributesGroup: { __typename?: "AttributesGroupEntity"; id: string }[];
						  }[]
						| null;
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
				maxItemsForPick
				attributes {
					id
					name
					price
					attributesGroup {
						id
					}
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
