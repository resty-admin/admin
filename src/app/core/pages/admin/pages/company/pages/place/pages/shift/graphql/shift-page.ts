import { Injectable } from "@angular/core";
import type * as Types from "@graphql";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";
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

export type ShiftHallsQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ShiftHallsQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
}

export type ShiftTablesQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ShiftTablesQuery {
	__typename?: "Query";
	tables: {
		__typename?: "PaginatedTable";
		page: number;
		totalCount: number;
		data?:
			| {
					__typename?: "TableEntity";
					id: string;
					name: string;
					hall: { __typename?: "HallEntity"; id: string; name: string };
			  }[]
			| null;
	};
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
export const ShiftHallsDocument = gql`
	query ShiftHalls($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		halls(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
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
export class ShiftHallsGQL extends Apollo.Query<ShiftHallsQuery, ShiftHallsQueryVariables> {
	override document = ShiftHallsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ShiftTablesDocument = gql`
	query ShiftTables($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		tables(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
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
export class ShiftTablesGQL extends Apollo.Query<ShiftTablesQuery, ShiftTablesQueryVariables> {
	override document = ShiftTablesDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
