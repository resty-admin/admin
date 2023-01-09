import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type AccountingSystemsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface AccountingSystemsQuery {
	__typename?: "Query";
	accountingSystems: {
		__typename?: "PaginatedAccountingSystem";
		totalCount: number;
		page: number;
		data?: { __typename?: "AccountingSystemEntity"; id: string; name: string }[] | null;
	};
}

export const AccountingSystemsDocument = gql`
	query AccountingSystems($skip: Int!, $take: Int!, $filtersArgs: [FiltersArgsDto!]) {
		accountingSystems(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			totalCount
			page
			data {
				id
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AccountingSystemsGQL extends Apollo.Query<AccountingSystemsQuery, AccountingSystemsQueryVariables> {
	override document = AccountingSystemsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
