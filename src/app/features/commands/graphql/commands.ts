import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CommandsQueryVariables = Types.Exact<Record<string, never>>;

export interface CommandsQuery {
	__typename?: "Query";
	commands: {
		__typename?: "PaginatedCommand";
		totalCount: number;
		page: number;
		data?: { __typename?: "CommandEntity"; id: string; name: string }[] | null;
	};
}

export type UpdateCommandMutationVariables = Types.Exact<{
	command: Types.UpdateCommandInput;
}>;

export interface UpdateCommandMutation {
	__typename?: "Mutation";
	updateCommand: { __typename?: "CommandEntity"; name: string };
}

export type CreateCommandMutationVariables = Types.Exact<{
	command: Types.CreateCommandInput;
}>;

export interface CreateCommandMutation {
	__typename?: "Mutation";
	createCommand: { __typename?: "CommandEntity"; id: string; name: string };
}

export type DeleteCommandMutationVariables = Types.Exact<{
	commandId: Types.Scalars["String"];
}>;

export interface DeleteCommandMutation {
	__typename?: "Mutation";
	deleteCommand: string;
}

export const CommandsDocument = gql`
	query Commands {
		commands {
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
export class CommandsGQL extends Apollo.Query<CommandsQuery, CommandsQueryVariables> {
	override document = CommandsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateCommandDocument = gql`
	mutation UpdateCommand($command: UpdateCommandInput!) {
		updateCommand(command: $command) {
			name
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
			name
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
