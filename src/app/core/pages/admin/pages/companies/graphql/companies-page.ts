import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type CompaniesPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface CompaniesPageQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		page: number;
		totalCount: number;
		data?: { __typename?: "CompanyEntity"; id: string; name: string }[] | null;
	};
}

export const CompaniesPageDocument = gql`
	query CompaniesPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		companies(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
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
export class CompaniesPageGQL extends Apollo.Query<CompaniesPageQuery, CompaniesPageQueryVariables> {
	override document = CompaniesPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
