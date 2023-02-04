import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type GuestsPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface GuestsPageQuery {
	__typename?: "Query";
	usersToPlaces: {
		__typename?: "PaginatedUserToPlace";
		data?:
			| {
					__typename?: "UserToPlaceEntity";
					id: string;
					user: {
						__typename?: "UserEntity";
						id: string;
						name: string;
						email?: string | null;
						tel?: string | null;
						role: Types.UserRoleEnum;
					};
			  }[]
			| null;
	};
}

export const GuestsPageDocument = gql`
	query GuestsPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		usersToPlaces(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				user {
					id
					name
					email
					tel
					role
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GuestsPageGQL extends Apollo.Query<GuestsPageQuery, GuestsPageQueryVariables> {
	override document = GuestsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
