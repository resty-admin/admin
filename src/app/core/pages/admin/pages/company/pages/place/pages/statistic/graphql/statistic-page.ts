import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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

export type StatisticPlaceQueryVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface StatisticPlaceQuery {
	__typename?: "Query";
	place: { __typename?: "PlaceEntity"; verificationStatus: Types.PlaceVerificationStatusEnum };
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
export const StatisticPlaceDocument = gql`
	query StatisticPlace($placeId: String!) {
		place(id: $placeId) {
			verificationStatus
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class StatisticPlaceGQL extends Apollo.Query<StatisticPlaceQuery, StatisticPlaceQueryVariables> {
	override document = StatisticPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
