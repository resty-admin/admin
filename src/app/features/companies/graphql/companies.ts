import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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
