import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../../../graphql";
export type ActiveOrdersPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ActiveOrdersPageQuery {
	__typename?: "Query";
	orders: {
		__typename?: "PaginatedActiveOrder";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ActiveOrderEntity";
					id: string;
					code: number;
					status: Types.OrderStatusEnum;
					type: Types.OrderTypeEnum;
					table?: {
						__typename?: "TableEntity";
						id: string;
						name: string;
						file?: { __typename?: "FileEntity"; id: string; url: string } | null;
					} | null;
			  }[]
			| null;
	};
}

export const ActiveOrdersPageDocument = gql`
	query ActiveOrdersPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		orders(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				code
				status
				type
				table {
					id
					name
					file {
						id
						url
					}
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ActiveOrdersPageGQL extends Apollo.Query<ActiveOrdersPageQuery, ActiveOrdersPageQueryVariables> {
	override document = ActiveOrdersPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
