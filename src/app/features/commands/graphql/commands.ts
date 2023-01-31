import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type UpdateCommandMutationVariables = Types.Exact<{
	command: Types.UpdateCommandInput;
}>;

export interface UpdateCommandMutation {
	__typename?: "Mutation";
	updateCommand: { __typename?: "CommandEntity"; id: string };
}

export type CreateCommandMutationVariables = Types.Exact<{
	command: Types.CreateCommandInput;
}>;

export interface CreateCommandMutation {
	__typename?: "Mutation";
	createCommand: { __typename?: "CommandEntity"; id: string };
}

export type DeleteCommandMutationVariables = Types.Exact<{
	commandId: Types.Scalars["String"];
}>;

export interface DeleteCommandMutation {
	__typename?: "Mutation";
	deleteCommand: string;
}

export const UpdateCommandDocument = gql`
	mutation UpdateCommand($command: UpdateCommandInput!) {
		updateCommand(command: $command) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateCommandGQL extends Apollo.Mutation<UpdateCommandMutation, UpdateCommandMutationVariables> {
	override document = UpdateCommandDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateCommandDocument = gql`
	mutation CreateCommand($command: CreateCommandInput!) {
		createCommand(command: $command) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateCommandGQL extends Apollo.Mutation<CreateCommandMutation, CreateCommandMutationVariables> {
	override document = CreateCommandDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteCommandDocument = gql`
	mutation DeleteCommand($commandId: String!) {
		deleteCommand(commandId: $commandId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteCommandGQL extends Apollo.Mutation<DeleteCommandMutation, DeleteCommandMutationVariables> {
	override document = DeleteCommandDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
