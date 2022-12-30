import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type AttributesQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface AttributesQuery {
	__typename?: "Query";
	attributes: {
		__typename?: "PaginatedAttributes";
		page: number;
		totalCount: number;
		data?: { __typename?: "AttributesEntity"; price?: number | null; name: string; id: string }[] | null;
	};
}

export type CreateAttrMutationVariables = Types.Exact<{
	attr: Types.CreateAttributeInput;
}>;

export interface CreateAttrMutation {
	__typename?: "Mutation";
	createAttr: { __typename?: "AttributesEntity"; id: string; name: string; price?: number | null };
}

export type UpdateAttrMutationVariables = Types.Exact<{
	attr: Types.UpdateAttributeInput;
}>;

export interface UpdateAttrMutation {
	__typename?: "Mutation";
	updateAttr: { __typename?: "AttributesEntity"; id: string; name: string; price?: number | null };
}

export type DeleteAttrMutationVariables = Types.Exact<{
	attrId: Types.Scalars["String"];
}>;

export interface DeleteAttrMutation {
	__typename?: "Mutation";
	deleteAttr: string;
}

export const AttributesDocument = gql`
	query Attributes($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		attributes(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				price
				name
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AttributesGQL extends Apollo.Query<AttributesQuery, AttributesQueryVariables> {
	override document = AttributesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateAttrDocument = gql`
	mutation CreateAttr($attr: CreateAttributeInput!) {
		createAttr(attr: $attr) {
			id
			name
			price
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateAttrGQL extends Apollo.Mutation<CreateAttrMutation, CreateAttrMutationVariables> {
	override document = CreateAttrDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateAttrDocument = gql`
	mutation UpdateAttr($attr: UpdateAttributeInput!) {
		updateAttr(attr: $attr) {
			id
			name
			price
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateAttrGQL extends Apollo.Mutation<UpdateAttrMutation, UpdateAttrMutationVariables> {
	override document = UpdateAttrDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteAttrDocument = gql`
	mutation DeleteAttr($attrId: String!) {
		deleteAttr(attrId: $attrId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteAttrGQL extends Apollo.Mutation<DeleteAttrMutation, DeleteAttrMutationVariables> {
	override document = DeleteAttrDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
