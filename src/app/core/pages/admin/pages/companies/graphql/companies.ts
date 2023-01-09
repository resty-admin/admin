import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type CompaniesPageQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	skip: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface CompaniesPageQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?: { __typename?: "CompanyEntity"; id: string; name: string }[] | null;
	};
}

export const CompaniesPageDocument = gql`
	query CompaniesPage($take: Int!, $skip: Int!, $filtersArgs: [FiltersArgsDto!]) {
		companies(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
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
export class CompaniesPageGQL extends Apollo.Query<CompaniesPageQuery, CompaniesPageQueryVariables> {
	override document = CompaniesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
