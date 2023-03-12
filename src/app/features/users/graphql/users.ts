import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CreateUserMutationVariables = Types.Exact<{
	user: Types.CreateUserInput;
}>;

export interface CreateUserMutation {
	__typename?: "Mutation";
	createUser: { __typename?: "UserEntity"; id: string };
}

export type UpdateUserMutationVariables = Types.Exact<{
	user: Types.UpdateUserInput;
}>;

export interface UpdateUserMutation {
	__typename?: "Mutation";
	updateUser: { __typename?: "UserEntity"; id: string };
}

export type DeleteUserMutationVariables = Types.Exact<{
	userId: Types.Scalars["String"];
}>;

export interface DeleteUserMutation {
	__typename?: "Mutation";
	deleteUser: string;
}

export type AddUserToPlaceMutationVariables = Types.Exact<{
	data: Types.UserToPlaceInput;
}>;

export interface AddUserToPlaceMutation {
	__typename?: "Mutation";
	addUserToPlace: { __typename?: "UserToPlaceEntity"; id: string };
}

export type RemoveUserFromPlaceMutationVariables = Types.Exact<{
	userToPlaceId: Types.Scalars["String"];
}>;

export interface RemoveUserFromPlaceMutation {
	__typename?: "Mutation";
	removeUserFromPlace: string;
}

export const CreateUserDocument = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
	override document = CreateUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateUserDocument = gql`
	mutation UpdateUser($user: UpdateUserInput!) {
		updateUser(user: $user) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateUserGQL extends Apollo.Mutation<UpdateUserMutation, UpdateUserMutationVariables> {
	override document = UpdateUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteUserDocument = gql`
	mutation DeleteUser($userId: String!) {
		deleteUser(userId: $userId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
	override document = DeleteUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const AddUserToPlaceDocument = gql`
	mutation AddUserToPlace($data: UserToPlaceInput!) {
		addUserToPlace(data: $data) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AddUserToPlaceGQL extends Apollo.Mutation<AddUserToPlaceMutation, AddUserToPlaceMutationVariables> {
	override document = AddUserToPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const RemoveUserFromPlaceDocument = gql`
	mutation RemoveUserFromPlace($userToPlaceId: String!) {
		removeUserFromPlace(userToPlaceId: $userToPlaceId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class RemoveUserFromPlaceGQL extends Apollo.Mutation<
	RemoveUserFromPlaceMutation,
	RemoveUserFromPlaceMutationVariables
> {
	override document = RemoveUserFromPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
