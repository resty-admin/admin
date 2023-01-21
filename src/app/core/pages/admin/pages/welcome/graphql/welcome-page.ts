import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type WelcomePageQueryVariables = Types.Exact<{
	userId: Types.Scalars["String"];
}>;

export interface WelcomePageQuery {
	__typename?: "Query";
	user: { __typename?: "UserEntity"; id: string; name: string };
}

export const WelcomePageDocument = gql`
	query WelcomePage($userId: String!) {
		user(id: $userId) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class WelcomePageGQL extends Apollo.Query<WelcomePageQuery, WelcomePageQueryVariables> {
	override document = WelcomePageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
