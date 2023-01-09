import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type TablesPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface TablesPageQuery {
	__typename?: "Query";
	tables: {
		__typename?: "PaginatedTable";
		page: number;
		totalCount: number;
		data?: { __typename?: "TableEntity"; id: string; name: string }[] | null;
	};
}

export const TablesPageDocument = gql`
	query TablesPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		tables(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
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
export class TablesPageGQL extends Apollo.Query<TablesPageQuery, TablesPageQueryVariables> {
	override document = TablesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
