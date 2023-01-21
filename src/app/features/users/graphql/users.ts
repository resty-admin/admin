import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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

export type AddEmployeeToPlaceMutationVariables = Types.Exact<{
	employeeData: Types.AddEmployeeInput;
}>;

export interface AddEmployeeToPlaceMutation {
	__typename?: "Mutation";
	addEmployeeToPlace: { __typename?: "PlaceEntity"; id: string };
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
export const AddEmployeeToPlaceDocument = gql`
	mutation AddEmployeeToPlace($employeeData: AddEmployeeInput!) {
		addEmployeeToPlace(employeeData: $employeeData) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AddEmployeeToPlaceGQL extends Apollo.Mutation<
	AddEmployeeToPlaceMutation,
	AddEmployeeToPlaceMutationVariables
> {
	override document = AddEmployeeToPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
