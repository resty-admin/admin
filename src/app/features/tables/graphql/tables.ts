import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type TablesQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface TablesQuery {
	__typename?: "Query";
	tables: {
		__typename?: "PaginatedTable";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "TableEntity";
					id: string;
					name: string;
					code: number;
					file?: { __typename?: "FileEntity"; url: string } | null;
			  }[]
			| null;
	};
}

export type CreateTableMutationVariables = Types.Exact<{
	table: Types.CreateTableInput;
}>;

export interface CreateTableMutation {
	__typename?: "Mutation";
	createTable: { __typename?: "TableEntity"; id: string; name: string; code: number };
}

export type UpdateTableMutationVariables = Types.Exact<{
	table: Types.UpdateTableInput;
}>;

export interface UpdateTableMutation {
	__typename?: "Mutation";
	updateTable: { __typename?: "TableEntity"; code: number; id: string; name: string };
}

export type DeleteTableMutationVariables = Types.Exact<{
	tableId: Types.Scalars["String"];
}>;

export interface DeleteTableMutation {
	__typename?: "Mutation";
	deleteTable: string;
}

export const TablesDocument = gql`
	query Tables($skip: Int!, $take: Int!, $filtersArgs: [FiltersArgsDto!]) {
		tables(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				name
				code
				file {
					url
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TablesGQL extends Apollo.Query<TablesQuery, TablesQueryVariables> {
	override document = TablesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateTableDocument = gql`
	mutation CreateTable($table: CreateTableInput!) {
		createTable(table: $table) {
			id
			name
			code
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
			code
			id
			name
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
