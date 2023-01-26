import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type HistoryOrdersPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
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
			  }[]
			| null;
	};
}

export const HistoryOrdersPageDocument = gql`
	query HistoryOrdersPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		historyOrders(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				orderNumber
				status
			}
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
