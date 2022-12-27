import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type GetAccountingSystemsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
}>;

export interface GetAccountingSystemsQuery {
	__typename?: "Query";
	accountingSystems: {
		__typename?: "PaginatedAccountingSystem";
		totalCount: number;
		page: number;
		data?: { __typename?: "AccountingSystemEntity"; id: string; name: string }[] | null;
	};
}

export const GetAccountingSystemsDocument = gql`
	query getAccountingSystems($skip: Int!, $take: Int!) {
		accountingSystems(skip: $skip, take: $take) {
			data {
				id
				name
			}
			totalCount
			page
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAccountingSystemsGQL extends Apollo.Query<
	GetAccountingSystemsQuery,
	GetAccountingSystemsQueryVariables
> {
	document = GetAccountingSystemsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
