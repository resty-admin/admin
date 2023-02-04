import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type ActiveShiftQueryVariables = Types.Exact<{
	filtersArgs: Types.FiltersArgsDto | Types.FiltersArgsDto[];
}>;

export interface ActiveShiftQuery {
	__typename?: "Query";
	shift: {
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
	};
}

export type ShiftPageQueryVariables = Types.Exact<{
	hallsFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	tablesFiltersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ShiftPageQuery {
	__typename?: "Query";
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
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
	query ActiveShift($filtersArgs: [FiltersArgsDto!]!) {
		shift(filtersArgs: $filtersArgs) {
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
export const ShiftPageDocument = gql`
	query ShiftPage($hallsFiltersArgs: [FiltersArgsDto!], $tablesFiltersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		halls(filtersArgs: $hallsFiltersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
			}
		}
		tables(filtersArgs: $tablesFiltersArgs, take: $take, skip: $skip) {
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
export class ShiftPageGQL extends Apollo.Query<ShiftPageQuery, ShiftPageQueryVariables> {
	override document = ShiftPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
