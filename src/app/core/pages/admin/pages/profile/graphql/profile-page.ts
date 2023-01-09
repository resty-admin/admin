import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ProfilePageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ProfilePageQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		page: number;
		totalCount: number;
		data?: { __typename?: "PlaceEntity"; id: string; name: string }[] | null;
	};
}

export const ProfilePageDocument = gql`
	query ProfilePage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
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
export class ProfilePageGQL extends Apollo.Query<ProfilePageQuery, ProfilePageQueryVariables> {
	override document = ProfilePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
