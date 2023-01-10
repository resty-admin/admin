import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type VerifyCodeMutationVariables = Types.Exact<{
	code: Types.Scalars["Int"];
}>;

export interface VerifyCodeMutation {
	__typename?: "Mutation";
	verifyCode: { __typename?: "AccessToken"; accessToken: string };
}

export const VerifyCodeDocument = gql`
	mutation VerifyCode($code: Int!) {
		verifyCode(code: $code) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class VerifyCodeGQL extends Apollo.Mutation<VerifyCodeMutation, VerifyCodeMutationVariables> {
	override document = VerifyCodeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
