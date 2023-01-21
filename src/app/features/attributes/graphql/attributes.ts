import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type CreateAttrMutationVariables = Types.Exact<{
	attr: Types.CreateAttributeInput;
}>;

export interface CreateAttrMutation {
	__typename?: "Mutation";
	createAttr: { __typename?: "AttributesEntity"; id: string; name: string; price: number };
}

export type UpdateAttrMutationVariables = Types.Exact<{
	attr: Types.UpdateAttributeInput;
}>;

export interface UpdateAttrMutation {
	__typename?: "Mutation";
	updateAttr: { __typename?: "AttributesEntity"; id: string; name: string; price: number };
}

export type DeleteAttrMutationVariables = Types.Exact<{
	attrId: Types.Scalars["String"];
}>;

export interface DeleteAttrMutation {
	__typename?: "Mutation";
	deleteAttr: string;
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
