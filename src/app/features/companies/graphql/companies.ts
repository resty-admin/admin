import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CompaniesQueryVariables = Types.Exact<Record<string, never>>;

export interface CompaniesQuery {
	__typename?: "Query";
	companies: {
		__typename?: "PaginatedCompany";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "CompanyEntity";
					name: string;
					id: string;
					status: Types.CompanyStatusEnum;
					employees?: { __typename?: "UserEntity"; id: string }[] | null;
					fondy?: { __typename?: "FondyEntity"; id: string } | null;
					logo?: { __typename?: "FileEntity"; id: string } | null;
					owner: { __typename?: "UserEntity"; id: string };
					places?: { __typename?: "PlaceEntity"; id: string }[] | null;
			  }[]
			| null;
	};
}

export type UpdateCompanyMutationVariables = Types.Exact<{
	company: Types.UpdateCompanyInput;
}>;

export interface UpdateCompanyMutation {
	__typename?: "Mutation";
	updateCompany: { __typename?: "CompanyEntity"; name: string };
}

export type CreateCompanyMutationVariables = Types.Exact<{
	company: Types.CreateCompanyInput;
}>;

export interface CreateCompanyMutation {
	__typename?: "Mutation";
	createCompany: { __typename?: "CompanyEntity"; id: string; name: string };
}

export type DeleteCompanyMutationVariables = Types.Exact<{
	companyId: Types.Scalars["String"];
}>;

export interface DeleteCompanyMutation {
	__typename?: "Mutation";
	deleteCompany: string;
}

export const CompaniesDocument = gql`
	query Companies {
		companies {
			data {
				name
				employees {
					id
				}
				fondy {
					id
				}
				id
				logo {
					id
				}
				name
				owner {
					id
				}
				places {
					id
				}
				status
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
			name
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
			name
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
