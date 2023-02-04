import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type AccessPageQueryVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface AccessPageQuery {
	__typename?: "Query";
	place: { __typename?: "PlaceEntity"; waiterCode?: number | null };
}

export const AccessPageDocument = gql`
	query AccessPage($placeId: String!) {
		place(id: $placeId) {
			waiterCode
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AccessPageGQL extends Apollo.Query<AccessPageQuery, AccessPageQueryVariables> {
	override document = AccessPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
