import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type AllOrdersPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AllOrdersPageQuery {
	__typename?: "Query";
	orders: {
		__typename?: "PaginatedActiveOrder";
		page: number;
		totalCount: number;
		data?: { __typename?: "ActiveOrderEntity"; id: string; code: number; status: Types.OrderStatusEnum }[] | null;
	};
}

export const AllOrdersPageDocument = gql`
	query AllOrdersPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		orders(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				code
				status
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AllOrdersPageGQL extends Apollo.Query<AllOrdersPageQuery, AllOrdersPageQueryVariables> {
	override document = AllOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
