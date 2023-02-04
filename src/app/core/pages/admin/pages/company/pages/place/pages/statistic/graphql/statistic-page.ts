import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type StatisticPageQueryVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface StatisticPageQuery {
	__typename?: "Query";
	getPlaceStatistic: {
		__typename?: "StatisticType";
		employees: number;
		guests: number;
		halls: number;
		tables: number;
		tax: number;
		totalAmount: number;
	};
	place: {
		__typename?: "PlaceEntity";
		id: string;
		verificationStatus: Types.PlaceVerificationStatusEnum;
		waiterCode?: number | null;
	};
}

export const StatisticPageDocument = gql`
	query StatisticPage($placeId: String!) {
		getPlaceStatistic(placeId: $placeId) {
			employees
			guests
			halls
			tables
			tax
			totalAmount
		}
		place(id: $placeId) {
			id
			verificationStatus
			waiterCode
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class StatisticPageGQL extends Apollo.Query<StatisticPageQuery, StatisticPageQueryVariables> {
	override document = StatisticPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
