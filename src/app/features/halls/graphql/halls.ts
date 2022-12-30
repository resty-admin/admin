import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type HallsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface HallsQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
}

export type CreateHallMutationVariables = Types.Exact<{
	hall: Types.CreateHallInput;
}>;

export interface CreateHallMutation {
	__typename?: "Mutation";
	createHall: { __typename?: "HallEntity"; id: string; name: string };
}

export type UpdateHallMutationVariables = Types.Exact<{
	hall: Types.UpdateHallInput;
}>;

export interface UpdateHallMutation {
	__typename?: "Mutation";
	updateHall: {
		__typename?: "HallEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; url: string; id: string } | null;
	};
}

export type DeleteHallMutationVariables = Types.Exact<{
	hallId: Types.Scalars["String"];
}>;

export interface DeleteHallMutation {
	__typename?: "Mutation";
	deleteHall: string;
}

export const HallsDocument = gql`
	query Halls($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		halls(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
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
export class HallsGQL extends Apollo.Query<HallsQuery, HallsQueryVariables> {
	override document = HallsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const CreateHallDocument = gql`
	mutation CreateHall($hall: CreateHallInput!) {
		createHall(hall: $hall) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class CreateHallGQL extends Apollo.Mutation<CreateHallMutation, CreateHallMutationVariables> {
	override document = CreateHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateHallDocument = gql`
	mutation UpdateHall($hall: UpdateHallInput!) {
		updateHall(hall: $hall) {
			file {
				url
				id
			}
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateHallGQL extends Apollo.Mutation<UpdateHallMutation, UpdateHallMutationVariables> {
	override document = UpdateHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteHallDocument = gql`
	mutation DeleteHall($hallId: String!) {
		deleteHall(hallId: $hallId)
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteHallGQL extends Apollo.Mutation<DeleteHallMutation, DeleteHallMutationVariables> {
	override document = DeleteHallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
