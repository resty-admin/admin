import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type TelegramMutationVariables = Types.Exact<{
	telegramUser: Types.TelegramUserInput;
}>;

export interface TelegramMutation {
	__typename?: "Mutation";
	telegram: { __typename?: "AccessToken"; accessToken: string };
}

export const TelegramDocument = gql`
	mutation Telegram($telegramUser: TelegramUserInput!) {
		telegram(telegramUser: $telegramUser) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TelegramGQL extends Apollo.Mutation<TelegramMutation, TelegramMutationVariables> {
	override document = TelegramDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
