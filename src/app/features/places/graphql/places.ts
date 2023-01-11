import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type PlacesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface PlacesQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		page: number;
		totalCount: number;
		data?: { __typename?: "PlaceEntity"; id: string; name: string }[] | null;
	};
}

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

export const PlacesDocument = gql`
	query Places($filtersArgs: [FiltersArgsDto!]) {
		places(filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class PlacesGQL extends Apollo.Query<PlacesQuery, PlacesQueryVariables> {
	override document = PlacesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
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
