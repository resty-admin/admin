import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type SignInMutationVariables = Types.Exact<{
	body: Types.SignInInput;
}>;

export interface SignInMutation {
	__typename?: "Mutation";
	signIn: { __typename?: "AccessToken"; accessToken: string };
}

export const SignInDocument = gql`
	mutation SignIn($body: SignInInput!) {
		signIn(body: $body) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SignInGQL extends Apollo.Mutation<SignInMutation, SignInMutationVariables> {
	override document = SignInDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
