import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type ShiftPageQueryVariables = Types.Exact<Record<string, never>>;

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
}

export const ShiftPageDocument = gql`
	query ShiftPage {
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
export class ShiftPageGQL extends Apollo.Query<ShiftPageQuery, ShiftPageQueryVariables> {
	override document = ShiftPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
