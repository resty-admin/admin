import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type SignUpMutationVariables = Types.Exact<{
	body: Types.SignUpInput;
}>;

export interface SignUpMutation {
	__typename?: "Mutation";
	signUp: { __typename?: "AccessToken"; accessToken: string };
}

export const SignUpDocument = gql`
	mutation SignUp($body: SignUpInput!) {
		signUp(body: $body) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SignUpGQL extends Apollo.Mutation<SignUpMutation, SignUpMutationVariables> {
	override document = SignUpDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
