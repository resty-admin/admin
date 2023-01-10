import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ResetPasswordMutationVariables = Types.Exact<{
	body: Types.ResetPasswordInput;
}>;

export interface ResetPasswordMutation {
	__typename?: "Mutation";
	resetPassword: { __typename?: "AccessToken"; accessToken: string };
}

export const ResetPasswordDocument = gql`
	mutation ResetPassword($body: ResetPasswordInput!) {
		resetPassword(body: $body) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ResetPasswordGQL extends Apollo.Mutation<ResetPasswordMutation, ResetPasswordMutationVariables> {
	override document = ResetPasswordDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
