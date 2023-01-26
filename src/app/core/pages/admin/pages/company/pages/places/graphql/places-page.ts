import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../graphql";
export type PlacesPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface PlacesPageQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		page: number;
		totalCount: number;
		data?: { __typename?: "PlaceEntity"; id: string; name: string }[] | null;
	};
}

export const PlacesPageDocument = gql`
	query PlacesPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		places(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
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
export class PlacesPageGQL extends Apollo.Query<PlacesPageQuery, PlacesPageQueryVariables> {
	override document = PlacesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
