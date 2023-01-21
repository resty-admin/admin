import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type HallsPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface HallsPageQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
}

export const HallsPageDocument = gql`
	query HallsPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		halls(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
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
export class HallsPageGQL extends Apollo.Query<HallsPageQuery, HallsPageQueryVariables> {
	override document = HallsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
