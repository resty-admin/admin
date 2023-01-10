import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type DashboardPageQueryVariables = Types.Exact<{
	guestsFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	hallsFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	tablesFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface DashboardPageQuery {
	__typename?: "Query";
	users: { __typename?: "PaginatedUser"; totalCount: number };
	halls: { __typename?: "PaginatedHall"; totalCount: number };
	tables: { __typename?: "PaginatedTable"; totalCount: number };
}

export const DashboardPageDocument = gql`
	query DashboardPage(
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
export class DashboardPageGQL extends Apollo.Query<DashboardPageQuery, DashboardPageQueryVariables> {
	override document = DashboardPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
