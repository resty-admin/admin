import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ActiveShiftQueryVariables = Types.Exact<Record<string, never>>;

export interface ActiveShiftQuery {
	__typename?: "Query";
	activeShift?: {
		__typename?: "ActiveShiftEntity";
		id: string;
		tables?:
			| {
					__typename?: "TableEntity";
					id: string;
					name: string;
					code: number;
					hall: { __typename?: "HallEntity"; id: string; name: string };
			  }[]
			| null;
	} | null;
}

export type ShiftsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
}>;

export interface ShiftsQuery {
	__typename?: "Query";
	shifts: {
		__typename?: "PaginatedActiveShift";
		page: number;
		totalCount: number;
		data?: { __typename?: "ActiveShiftEntity"; id: string }[] | null;
	};
}

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

export const ActiveShiftDocument = gql`
	query ActiveShift {
		activeShift {
			id
			tables {
				id
				name
				code
				hall {
					id
					name
				}
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ActiveShiftGQL extends Apollo.Query<ActiveShiftQuery, ActiveShiftQueryVariables> {
	override document = ActiveShiftDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ShiftsDocument = gql`
	query Shifts($skip: Int!, $take: Int!, $filtersArgs: [FiltersArgsDto!]) {
		shifts(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ShiftsGQL extends Apollo.Query<ShiftsQuery, ShiftsQueryVariables> {
	override document = ShiftsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
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
