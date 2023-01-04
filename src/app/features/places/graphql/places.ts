import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type PlacesQueryVariables = Types.Exact<{
	take: Types.Scalars["Int"];
	skip: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface PlacesQuery {
	__typename?: "Query";
	places: {
		__typename?: "PaginatedPlace";
		totalCount: number;
		page: number;
		data?:
			| {
					__typename?: "PlaceEntity";
					name: string;
					id: string;
					status: Types.PlaceStatusEnum;
					address?: string | null;
					file?: { __typename?: "FileEntity"; id: string; url: string } | null;
			  }[]
			| null;
	};
}

export type UpdatePlaceMutationVariables = Types.Exact<{
	place: Types.UpdatePlaceInput;
}>;

export interface UpdatePlaceMutation {
	__typename?: "Mutation";
	updatePlace: { __typename?: "PlaceEntity"; name: string };
}

export type CreatePlacesMutationVariables = Types.Exact<{
	place: Types.CreatePlaceInput;
}>;

export interface CreatePlacesMutation {
	__typename?: "Mutation";
	createPlace: { __typename?: "PlaceEntity"; id: string; name: string };
}

export type DeletePlaceMutationVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface DeletePlaceMutation {
	__typename?: "Mutation";
	deletePlace: string;
}

export const PlacesDocument = gql`
	query Places($take: Int!, $skip: Int!, $filtersArgs: FiltersArgsDto) {
		places(take: $take, skip: $skip, filtersArgs: $filtersArgs) {
			data {
				name
				id
				name
				status
				address
				file {
					id
					url
				}
			}
			totalCount
			page
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
			name
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
			name
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
