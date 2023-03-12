import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type EmployeesPageQueryVariables = Types.Exact<{
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface EmployeesPageQuery {
	__typename?: "Query";
	usersToPlaces: {
		__typename?: "PaginatedUserToPlace";
		totalCount: number;
		page: number;
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

export const EmployeesPageDocument = gql`
	query EmployeesPage($skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
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
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class EmployeesPageGQL extends Apollo.Query<EmployeesPageQuery, EmployeesPageQueryVariables> {
	override document = EmployeesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
