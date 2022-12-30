import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ShiftsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
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

export const ShiftsDocument = gql`
	query Shifts($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
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
