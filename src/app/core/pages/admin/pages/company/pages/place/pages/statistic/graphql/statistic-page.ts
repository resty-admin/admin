import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type StatisticPageQueryVariables = Types.Exact<{
	guestsFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	hallsFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	tablesFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface StatisticPageQuery {
	__typename?: "Query";
	users: { __typename?: "PaginatedUser"; totalCount: number };
	halls: { __typename?: "PaginatedHall"; totalCount: number };
	tables: { __typename?: "PaginatedTable"; totalCount: number };
}

export const StatisticPageDocument = gql`
	query StatisticPage(
		$guestsFiltersArgs: [FiltersArgsDto!]
		$hallsFiltersArgs: [FiltersArgsDto!]
		$tablesFiltersArgs: [FiltersArgsDto!]
	) {
		users(filtersArgs: $guestsFiltersArgs) {
			totalCount
		}
		halls(filtersArgs: $hallsFiltersArgs) {
			totalCount
		}
		tables(filtersArgs: $tablesFiltersArgs) {
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class StatisticPageGQL extends Apollo.Query<StatisticPageQuery, StatisticPageQueryVariables> {
	override document = StatisticPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}