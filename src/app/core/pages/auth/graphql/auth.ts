import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type GetMeQueryVariables = Types.Exact<Record<string, never>>;

export interface GetMeQuery {
	__typename?: "Query";
	getMe: { __typename?: "AccessToken"; accessToken: string };
}

export const GetMeDocument = gql`
	query GetMe {
		getMe {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetMeGQL extends Apollo.Query<GetMeQuery, GetMeQueryVariables> {
	override document = GetMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
