import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type ForgotPasswordMutationVariables = Types.Exact<{
	body: Types.ForgotPasswordInput;
}>;

export interface ForgotPasswordMutation {
	__typename?: "Mutation";
	forgotPassword: string;
}

export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($body: ForgotPasswordInput!) {
		forgotPassword(body: $body)
	}
`;

@Injectable({
	providedIn: "root"
})
export class ForgotPasswordGQL extends Apollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> {
	override document = ForgotPasswordDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
