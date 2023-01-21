import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
export type UpdatePlaceMutationVariables = Types.Exact<{
	place: Types.UpdatePlaceInput;
}>;

export interface UpdatePlaceMutation {
	__typename?: "Mutation";
	updatePlace: { __typename?: "PlaceEntity"; id: string };
}

export type CreatePlacesMutationVariables = Types.Exact<{
	place: Types.CreatePlaceInput;
}>;

export interface CreatePlacesMutation {
	__typename?: "Mutation";
	createPlace: { __typename?: "PlaceEntity"; id: string };
}

export type DeletePlaceMutationVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface DeletePlaceMutation {
	__typename?: "Mutation";
	deletePlace: string;
}

export type UpdatePlaceVerificationMutationVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
	status: Types.PlaceVerificationStatusEnum;
}>;

export interface UpdatePlaceVerificationMutation {
	__typename?: "Mutation";
	updatePlaceVerification: { __typename?: "PlaceEntity"; id: string };
}

export const UpdatePlaceDocument = gql`
	mutation UpdatePlace($place: UpdatePlaceInput!) {
		updatePlace(place: $place) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdatePlaceGQL extends Apollo.Mutation<UpdatePlaceMutation, UpdatePlaceMutationVariables> {
	override document = UpdatePlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreatePlacesDocument = gql`
	mutation CreatePlaces($place: CreatePlaceInput!) {
		createPlace(place: $place) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreatePlacesGQL extends Apollo.Mutation<CreatePlacesMutation, CreatePlacesMutationVariables> {
	override document = CreatePlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeletePlaceDocument = gql`
	mutation DeletePlace($placeId: String!) {
		deletePlace(placeId: $placeId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeletePlaceGQL extends Apollo.Mutation<DeletePlaceMutation, DeletePlaceMutationVariables> {
	override document = DeletePlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdatePlaceVerificationDocument = gql`
	mutation UpdatePlaceVerification($placeId: String!, $status: PlaceVerificationStatusEnum!) {
		updatePlaceVerification(placeId: $placeId, status: $status) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdatePlaceVerificationGQL extends Apollo.Mutation<
	UpdatePlaceVerificationMutation,
	UpdatePlaceVerificationMutationVariables
> {
	override document = UpdatePlaceVerificationDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
