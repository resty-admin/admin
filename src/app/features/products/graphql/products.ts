import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type CreateProductMutationVariables = Types.Exact<{
	product: Types.CreateProductInput;
}>;

export interface CreateProductMutation {
	__typename?: "Mutation";
	createProduct: { __typename?: "ProductEntity"; id: string };
}

export type UpdateProductMutationVariables = Types.Exact<{
	product: Types.UpdateProductInput;
}>;

export interface UpdateProductMutation {
	__typename?: "Mutation";
	updateProduct: { __typename?: "ProductEntity"; id: string };
}

export type DeleteProductMutationVariables = Types.Exact<{
	productId: Types.Scalars["String"];
}>;

export interface DeleteProductMutation {
	__typename?: "Mutation";
	deleteProduct: string;
}

export const CreateProductDocument = gql`
	mutation CreateProduct($product: CreateProductInput!) {
		createProduct(product: $product) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateProductGQL extends Apollo.Mutation<CreateProductMutation, CreateProductMutationVariables> {
	override document = CreateProductDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateProductDocument = gql`
	mutation UpdateProduct($product: UpdateProductInput!) {
		updateProduct(product: $product) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateProductGQL extends Apollo.Mutation<UpdateProductMutation, UpdateProductMutationVariables> {
	override document = UpdateProductDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteProductDocument = gql`
	mutation DeleteProduct($productId: String!) {
		deleteProduct(productId: $productId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteProductGQL extends Apollo.Mutation<DeleteProductMutation, DeleteProductMutationVariables> {
	override document = DeleteProductDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
