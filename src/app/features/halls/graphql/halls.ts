import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CreateHallMutationVariables = Types.Exact<{
	hall: Types.CreateHallInput;
}>;

export interface CreateHallMutation {
	__typename?: "Mutation";
	createHall: { __typename?: "HallEntity"; id: string };
}

export type UpdateHallMutationVariables = Types.Exact<{
	hall: Types.UpdateHallInput;
}>;

export interface UpdateHallMutation {
	__typename?: "Mutation";
	updateHall: { __typename?: "HallEntity"; id: string };
}

export type DeleteHallMutationVariables = Types.Exact<{
	hallId: Types.Scalars["String"];
}>;

export interface DeleteHallMutation {
	__typename?: "Mutation";
	deleteHall: string;
}

export const CreateHallDocument = gql`
	mutation CreateHall($hall: CreateHallInput!) {
		createHall(hall: $hall) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateHallGQL extends Apollo.Mutation<CreateHallMutation, CreateHallMutationVariables> {
	override document = CreateHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateHallDocument = gql`
	mutation UpdateHall($hall: UpdateHallInput!) {
		updateHall(hall: $hall) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateHallGQL extends Apollo.Mutation<UpdateHallMutation, UpdateHallMutationVariables> {
	override document = UpdateHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteHallDocument = gql`
	mutation DeleteHall($hallId: String!) {
		deleteHall(hallId: $hallId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteHallGQL extends Apollo.Mutation<DeleteHallMutation, DeleteHallMutationVariables> {
	override document = DeleteHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
