import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type AccountingSystemsPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AccountingSystemsPageQuery {
	__typename?: "Query";
	accountingSystems: {
		__typename?: "PaginatedAccountingSystem";
		page: number;
		totalCount: number;
		data?: { __typename?: "AccountingSystemEntity"; id: string; name: string }[] | null;
	};
}

export const AccountingSystemsPageDocument = gql`
	query AccountingSystemsPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		accountingSystems(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
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
export class AccountingSystemsPageGQL extends Apollo.Query<
	AccountingSystemsPageQuery,
	AccountingSystemsPageQueryVariables
> {
	override document = AccountingSystemsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
