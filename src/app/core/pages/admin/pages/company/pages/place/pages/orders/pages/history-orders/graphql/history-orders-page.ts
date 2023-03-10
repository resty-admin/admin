import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type HistoryOrdersPageQueryVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface HistoryOrdersPageQuery {
	__typename?: "Query";
	historyOrders: {
		__typename?: "PaginatedHistoryOrder";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "HistoryOrderEntity";
					id: string;
					orderNumber: number;
					status: Types.OrderStatusEnum;
					startDate?: any | null;
					type: Types.OrderTypeEnum;
			  }[]
			| null;
	};
}

export const HistoryOrdersPageDocument = gql`
	query HistoryOrdersPage($placeId: String!, $skip: Int, $take: Int, $filtersArgs: [FiltersArgsDto!]) {
		historyOrders(placeId: $placeId, skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				orderNumber
				status
				startDate
				type
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HistoryOrdersPageGQL extends Apollo.Query<HistoryOrdersPageQuery, HistoryOrdersPageQueryVariables> {
	override document = HistoryOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
