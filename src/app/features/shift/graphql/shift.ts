import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type CreateShiftMutationVariables = Types.Exact<{
	shift: Types.CreateShiftInput;
}>;

export interface CreateShiftMutation {
	__typename?: "Mutation";
	createShift: { __typename?: "ActiveShiftEntity"; id: string };
}

export type UpdateShiftMutationVariables = Types.Exact<{
	shift: Types.UpdateShiftInput;
}>;

export interface UpdateShiftMutation {
	__typename?: "Mutation";
	updateShift: { __typename?: "ActiveShiftEntity"; id: string };
}

export type CloseShiftMutationVariables = Types.Exact<{
	shiftId: Types.Scalars["String"];
}>;

export interface CloseShiftMutation {
	__typename?: "Mutation";
	closeShift: string;
}

export const CreateShiftDocument = gql`
	mutation CreateShift($shift: CreateShiftInput!) {
		createShift(shift: $shift) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateShiftGQL extends Apollo.Mutation<CreateShiftMutation, CreateShiftMutationVariables> {
	override document = CreateShiftDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateShiftDocument = gql`
	mutation UpdateShift($shift: UpdateShiftInput!) {
		updateShift(shift: $shift) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateShiftGQL extends Apollo.Mutation<UpdateShiftMutation, UpdateShiftMutationVariables> {
	override document = UpdateShiftDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CloseShiftDocument = gql`
	mutation CloseShift($shiftId: String!) {
		closeShift(shiftId: $shiftId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class CloseShiftGQL extends Apollo.Mutation<CloseShiftMutation, CloseShiftMutationVariables> {
	override document = CloseShiftDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
