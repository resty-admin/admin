import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type WalletPageQueryVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface WalletPageQuery {
	__typename?: "Query";
	getPlaceStatistic: { __typename?: "StatisticType"; tax: number; totalAmount: number };
}

export const WalletPageDocument = gql`
	query WalletPage($placeId: String!) {
		getPlaceStatistic(placeId: $placeId) {
			tax
			totalAmount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class WalletPageGQL extends Apollo.Query<WalletPageQuery, WalletPageQueryVariables> {
	override document = WalletPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
