import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type HallQueryVariables = Types.Exact<{
	hallId: Types.Scalars["String"];
}>;

export interface HallQuery {
	__typename?: "Query";
	hall: {
		__typename?: "HallEntity";
		id: string;
		name: string;
		file?: { __typename?: "FileEntity"; id: string; url: string } | null;
	};
}

export const HallDocument = gql`
	query Hall($hallId: String!) {
		hall(id: $hallId) {
			id
			file {
				id
				url
			}
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class HallGQL extends Apollo.Query<HallQuery, HallQueryVariables> {
	override document = HallDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
