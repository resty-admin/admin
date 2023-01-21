import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type CreateTableMutationVariables = Types.Exact<{
	table: Types.CreateTableInput;
}>;

export interface CreateTableMutation {
	__typename?: "Mutation";
	createTable: { __typename?: "TableEntity"; id: string };
}

export type UpdateTableMutationVariables = Types.Exact<{
	table: Types.UpdateTableInput;
}>;

export interface UpdateTableMutation {
	__typename?: "Mutation";
	updateTable: { __typename?: "TableEntity"; id: string };
}

export type DeleteTableMutationVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface DeleteTableMutation {
	__typename?: "Mutation";
	deleteTable: string;
}

export const CreateTableDocument = gql`
	mutation CreateTable($table: CreateTableInput!) {
		createTable(table: $table) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateTableGQL extends Apollo.Mutation<CreateTableMutation, CreateTableMutationVariables> {
	override document = CreateTableDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateTableDocument = gql`
	mutation UpdateTable($table: UpdateTableInput!) {
		updateTable(table: $table) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateTableGQL extends Apollo.Mutation<UpdateTableMutation, UpdateTableMutationVariables> {
	override document = UpdateTableDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteTableDocument = gql`
	mutation DeleteTable($tableId: String!) {
		deleteTable(tableId: $tableId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteTableGQL extends Apollo.Mutation<DeleteTableMutation, DeleteTableMutationVariables> {
	override document = DeleteTableDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
