import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CompaniesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface CompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?: { __typename?: "CompanyEntity"; id: string; name: string }[] | null;
	};
}

export type UpdateCompanyMutationVariables = Types.Exact<{
	company: Types.UpdateCompanyInput;
}>;

export interface UpdateCompanyMutation {
	__typename?: "Mutation";
	updateCompany: { __typename?: "CompanyEntity"; id: string };
}

export type CreateCompanyMutationVariables = Types.Exact<{
	company: Types.CreateCompanyInput;
}>;

export interface CreateCompanyMutation {
	__typename?: "Mutation";
	createCompany: { __typename?: "CompanyEntity"; id: string };
}

export type DeleteCompanyMutationVariables = Types.Exact<{
	companyId: Types.Scalars["String"];
}>;

export interface DeleteCompanyMutation {
	__typename?: "Mutation";
	deleteCompany: string;
}

export const CompaniesDocument = gql`
	query Companies($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
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
export class CompaniesGQL extends Apollo.Query<CompaniesQuery, CompaniesQueryVariables> {
	override document = CompaniesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateCompanyDocument = gql`
	mutation UpdateCompany($company: UpdateCompanyInput!) {
		updateCompany(company: $company) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateCompanyGQL extends Apollo.Mutation<UpdateCompanyMutation, UpdateCompanyMutationVariables> {
	override document = UpdateCompanyDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateCompanyDocument = gql`
	mutation CreateCompany($company: CreateCompanyInput!) {
		createCompany(company: $company) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateCompanyGQL extends Apollo.Mutation<CreateCompanyMutation, CreateCompanyMutationVariables> {
	override document = CreateCompanyDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteCompanyDocument = gql`
	mutation DeleteCompany($companyId: String!) {
		deleteCompany(companyId: $companyId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteCompanyGQL extends Apollo.Mutation<DeleteCompanyMutation, DeleteCompanyMutationVariables> {
	override document = DeleteCompanyDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
