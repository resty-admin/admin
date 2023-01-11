import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type ShiftPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface ShiftPageQuery {
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
	tables: {
		__typename?: "PaginatedTable";
		page: number;
		totalCount: number;
		data?: { __typename?: "TableEntity"; id: string; name: string }[] | null;
	};
	halls: {
		__typename?: "PaginatedHall";
		page: number;
		totalCount: number;
		data?: { __typename?: "HallEntity"; id: string; name: string }[] | null;
	};
}

export const ShiftPageDocument = gql`
	query ShiftPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
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
		tables(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
			}
		}
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
export class ShiftPageGQL extends Apollo.Query<ShiftPageQuery, ShiftPageQueryVariables> {
	override document = ShiftPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
