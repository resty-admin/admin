import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type AsideCompaniesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface AsideCompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?: { __typename?: "CompanyEntity"; id: string; name: string }[] | null;
	};
}

export const AsideCompaniesDocument = gql`
	query AsideCompanies($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		companies(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
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
export class AsideCompaniesGQL extends Apollo.Query<AsideCompaniesQuery, AsideCompaniesQueryVariables> {
	override document = AsideCompaniesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
