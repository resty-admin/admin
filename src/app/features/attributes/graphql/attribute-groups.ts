import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type AttributeGroupsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface AttributeGroupsQuery {
	__typename?: "Query";
	attributeGroups: {
		__typename?: "PaginatedAttributeGroups";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "AttributesGroupEntity";
					id: string;
					type: Types.AttributeGroupTypeEnum;
					maxItemsForPick: number;
					name: string;
					attributes?: { __typename?: "AttributesEntity"; name: string }[] | null;
			  }[]
			| null;
	};
}

export type CreateAttrGroupMutationVariables = Types.Exact<{
	attrGroup: Types.CreateAttributeGroupInput;
}>;

export interface CreateAttrGroupMutation {
	__typename?: "Mutation";
	createAttrGroup: {
		__typename?: "AttributesGroupEntity";
		id: string;
		type: Types.AttributeGroupTypeEnum;
		maxItemsForPick: number;
		name: string;
	};
}

export type UpdateAttrGroupMutationVariables = Types.Exact<{
	attrGroup: Types.UpdateAttributeGroupInput;
}>;

export interface UpdateAttrGroupMutation {
	__typename?: "Mutation";
	updateAttrGroup: {
		__typename?: "AttributesGroupEntity";
		id: string;
		type: Types.AttributeGroupTypeEnum;
		maxItemsForPick: number;
		name: string;
	};
}

export type DeleteAttrGroupMutationVariables = Types.Exact<{
	attrGroupId: Types.Scalars["String"];
}>;

export interface DeleteAttrGroupMutation {
	__typename?: "Mutation";
	deleteAttrGroup: string;
}

export const AttributeGroupsDocument = gql`
	query AttributeGroups($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		attributeGroups(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				type
				maxItemsForPick
				name
				attributes {
					name
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AttributeGroupsGQL extends Apollo.Query<AttributeGroupsQuery, AttributeGroupsQueryVariables> {
	override document = AttributeGroupsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateAttrGroupDocument = gql`
	mutation CreateAttrGroup($attrGroup: CreateAttributeGroupInput!) {
		createAttrGroup(attrGroup: $attrGroup) {
			id
			type
			maxItemsForPick
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateAttrGroupGQL extends Apollo.Mutation<CreateAttrGroupMutation, CreateAttrGroupMutationVariables> {
	override document = CreateAttrGroupDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateAttrGroupDocument = gql`
	mutation UpdateAttrGroup($attrGroup: UpdateAttributeGroupInput!) {
		updateAttrGroup(attrGroup: $attrGroup) {
			id
			type
			maxItemsForPick
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateAttrGroupGQL extends Apollo.Mutation<UpdateAttrGroupMutation, UpdateAttrGroupMutationVariables> {
	override document = UpdateAttrGroupDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteAttrGroupDocument = gql`
	mutation DeleteAttrGroup($attrGroupId: String!) {
		deleteAttrGroup(attrGroupId: $attrGroupId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteAttrGroupGQL extends Apollo.Mutation<DeleteAttrGroupMutation, DeleteAttrGroupMutationVariables> {
	override document = DeleteAttrGroupDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
