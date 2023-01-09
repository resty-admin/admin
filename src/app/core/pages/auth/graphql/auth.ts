import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type GetMeQueryVariables = Types.Exact<Record<string, never>>;

export interface GetMeQuery {
	__typename?: "Query";
	getMe: { __typename?: "AccessToken"; accessToken: string };
}

export type UpdateMeMutationVariables = Types.Exact<{
	user: Types.UpdateMeInput;
}>;

export interface UpdateMeMutation {
	__typename?: "Mutation";
	updateMe: { __typename?: "UserEntity"; id: string; name: string };
}

export type DeleteMeMutationVariables = Types.Exact<Record<string, never>>;

export interface DeleteMeMutation {
	__typename?: "Mutation";
	deleteMe: string;
}

export const GetMeDocument = gql`
	query GetMe {
		getMe {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetMeGQL extends Apollo.Query<GetMeQuery, GetMeQueryVariables> {
	override document = GetMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateMeDocument = gql`
	mutation UpdateMe($user: UpdateMeInput!) {
		updateMe(user: $user) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateMeGQL extends Apollo.Mutation<UpdateMeMutation, UpdateMeMutationVariables> {
	override document = UpdateMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteMeDocument = gql`
	mutation DeleteMe {
		deleteMe
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteMeGQL extends Apollo.Mutation<DeleteMeMutation, DeleteMeMutationVariables> {
	override document = DeleteMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
