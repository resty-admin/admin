import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type CategoriesQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface CategoriesQuery {
	__typename?: "Query";
	categories: {
		__typename?: "PaginatedCategory";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "CategoryEntity";
					id: string;
					name: string;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
					products?: { __typename?: "ProductEntity"; name: string; price: number }[] | null;
			  }[]
			| null;
	};
}

export type CreateCategoryMutationVariables = Types.Exact<{
	category: Types.CreateCategoryInput;
}>;

export interface CreateCategoryMutation {
	__typename?: "Mutation";
	createCategory: {
		__typename?: "CategoryEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; url: string; id: string } | null;
	};
}

export type UpdateCategoryMutationVariables = Types.Exact<{
	category: Types.UpdateCategoryInput;
}>;

export interface UpdateCategoryMutation {
	__typename?: "Mutation";
	updateCategory: {
		__typename?: "CategoryEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; url: string; id: string } | null;
	};
}

export type DeleteCategoryMutationVariables = Types.Exact<{
	categoryId: Types.Scalars["String"];
}>;

export interface DeleteCategoryMutation {
	__typename?: "Mutation";
	deleteCategory: string;
}

export const CategoriesDocument = gql`
	query Categories($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		categories(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			data {
				id
				name
				file {
					id
					url
				}
				products {
					name
					price
				}
			}
			page
			totalCount
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CategoriesGQL extends Apollo.Query<CategoriesQuery, CategoriesQueryVariables> {
	override document = CategoriesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateCategoryDocument = gql`
	mutation CreateCategory($category: CreateCategoryInput!) {
		createCategory(category: $category) {
			id
			name
			file {
				url
				id
			}
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
			name
			file {
				url
				id
			}
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
