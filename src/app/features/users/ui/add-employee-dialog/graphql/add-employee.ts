import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type FindUserQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	userId?: Types.InputMaybe<Types.Scalars["String"]>;
}>;

export interface FindUserQuery {
	__typename?: "Query";
	user: { __typename?: "UserEntity"; id: string };
}

export const FindUserDocument = gql`
	query FindUser($filtersArgs: [FiltersArgsDto!], $userId: String) {
		user(filtersArgs: $filtersArgs, id: $userId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class FindUserGQL extends Apollo.Query<FindUserQuery, FindUserQueryVariables> {
	override document = FindUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
