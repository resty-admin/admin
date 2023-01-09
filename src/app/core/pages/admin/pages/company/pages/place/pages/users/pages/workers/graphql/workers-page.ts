import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type WorkersPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface WorkersPageQuery {
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

export const WorkersPageDocument = gql`
	query WorkersPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
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
export class WorkersPageGQL extends Apollo.Query<WorkersPageQuery, WorkersPageQueryVariables> {
	override document = WorkersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
