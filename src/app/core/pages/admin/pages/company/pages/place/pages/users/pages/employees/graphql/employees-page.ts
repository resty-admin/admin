import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type EmployeesPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface EmployeesPageQuery {
	__typename?: "Query";
	users: {
		__typename?: "PaginatedUser";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "UserEntity";
					id: string;
					name: string;
					email?: string | null;
					role: Types.UserRoleEnum;
					tel?: string | null;
			  }[]
			| null;
	};
}

export const EmployeesPageDocument = gql`
	query EmployeesPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		users(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
				email
				role
				tel
			}
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
