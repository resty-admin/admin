import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type HistoryOrderPageQueryVariables = Types.Exact<{
	historyOrderId: Types.Scalars["String"];
}>;

export interface HistoryOrderPageQuery {
	__typename?: "Query";
	historyOrder: {
		__typename?: "HistoryOrderEntity";
		id: string;
		orderNumber?: number | null;
		productsToOrders: any[];
		status: Types.OrderStatusEnum;
		table?: any | null;
		totalPrice?: number | null;
		type: Types.OrderTypeEnum;
		users: any[];
		startDate?: any | null;
		place: { __typename?: "PlaceEntity"; id: string };
	};
}

export const HistoryOrderPageDocument = gql`
	query HistoryOrderPage($historyOrderId: String!) {
		historyOrder(id: $historyOrderId) {
			id
			orderNumber
			place {
				id
			}
			productsToOrders
			status
			table
			totalPrice
			type
			users
			startDate
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HistoryOrderPageGQL extends Apollo.Query<HistoryOrderPageQuery, HistoryOrderPageQueryVariables> {
	override document = HistoryOrderPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
