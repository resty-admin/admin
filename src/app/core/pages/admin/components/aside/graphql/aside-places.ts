import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type AsidePlacesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface AsidePlacesQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		page: number;
		totalCount: number;
		data?: { __typename?: "PlaceEntity"; id: string; name: string }[] | null;
	};
}

export const AsidePlacesDocument = gql`
	query AsidePlaces($filtersArgs: [FiltersArgsDto!]) {
		places(filtersArgs: $filtersArgs) {
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
export class AsidePlacesGQL extends Apollo.Query<AsidePlacesQuery, AsidePlacesQueryVariables> {
	override document = AsidePlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
