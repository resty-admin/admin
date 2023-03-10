import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CreateCategoryMutationVariables = Types.Exact<{
	category: Types.CreateCategoryInput;
}>;

export interface CreateCategoryMutation {
	__typename?: "Mutation";
	createCategory: { __typename?: "CategoryEntity"; id: string };
}

export type UpdateCategoryMutationVariables = Types.Exact<{
	category: Types.UpdateCategoryInput;
}>;

export interface UpdateCategoryMutation {
	__typename?: "Mutation";
	updateCategory: { __typename?: "CategoryEntity"; id: string };
}

export type DeleteCategoryMutationVariables = Types.Exact<{
	categoryId: Types.Scalars["String"];
}>;

export interface DeleteCategoryMutation {
	__typename?: "Mutation";
	deleteCategory: string;
}

export const CreateCategoryDocument = gql`
	mutation CreateCategory($category: CreateCategoryInput!) {
		createCategory(category: $category) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateCategoryGQL extends Apollo.Mutation<CreateCategoryMutation, CreateCategoryMutationVariables> {
	override document = CreateCategoryDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateCategoryDocument = gql`
	mutation UpdateCategory($category: UpdateCategoryInput!) {
		updateCategory(category: $category) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateCategoryGQL extends Apollo.Mutation<UpdateCategoryMutation, UpdateCategoryMutationVariables> {
	override document = UpdateCategoryDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteCategoryDocument = gql`
	mutation DeleteCategory($categoryId: String!) {
		deleteCategory(categoryId: $categoryId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteCategoryGQL extends Apollo.Mutation<DeleteCategoryMutation, DeleteCategoryMutationVariables> {
	override document = DeleteCategoryDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
