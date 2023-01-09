import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ProductsQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	skip: Types.Scalars["Int"];
}>;

export interface ProductsQuery {
	__typename?: "Query";
	products: {
		__typename?: "PaginatedProduct";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "ProductEntity";
					price: number;
					name: string;
					id: string;
					description?: string | null;
					category?: { __typename?: "CategoryEntity"; name: string } | null;
					file?: { __typename?: "FileEntity"; url: string; id: string } | null;
			  }[]
			| null;
	};
}

export type CreateProductMutationVariables = Types.Exact<{
	product: Types.CreateProductInput;
}>;

export interface CreateProductMutation {
	__typename?: "Mutation";
	createProduct: {
		__typename?: "ProductEntity";
		description?: string | null;
		id: string;
		name: string;
		price: number;
		file?: { __typename?: "FileEntity"; url: string; id: string } | null;
	};
}

export type UpdateProductMutationVariables = Types.Exact<{
	product: Types.UpdateProductInput;
}>;

export interface UpdateProductMutation {
	__typename?: "Mutation";
	updateProduct: {
		__typename?: "ProductEntity";
		description?: string | null;
		id: string;
		name: string;
		price: number;
		file?: { __typename?: "FileEntity"; url: string; id: string } | null;
	};
}

export type DeleteProductMutationVariables = Types.Exact<{
	productId: Types.Scalars["String"];
}>;

export interface DeleteProductMutation {
	__typename?: "Mutation";
	deleteProduct: string;
}

export const ProductsDocument = gql`
	query Products($take: Int!, $filtersArgs: [FiltersArgsDto!], $skip: Int!) {
		products(take: $take, filtersArgs: $filtersArgs, skip: $skip) {
			page
			totalCount
			data {
				price
				name
				id
				description
				category {
					name
				}
				file {
					url
					id
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ProductsGQL extends Apollo.Query<ProductsQuery, ProductsQueryVariables> {
	override document = ProductsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateProductDocument = gql`
	mutation CreateProduct($product: CreateProductInput!) {
		createProduct(product: $product) {
			description
			file {
				url
				id
			}
			id
			name
			price
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
			description
			file {
				url
				id
			}
			id
			name
			price
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
