import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type AdminPageQueryVariables = Types.Exact<{
	orderId: Types.Scalars["String"];
}>;

export interface AdminPageQuery {
	__typename?: "Query";
	order: { __typename?: "ActiveOrderEntity"; type: Types.OrderTypeEnum; id: string; code: number };
}

export const AdminPageDocument = gql`
	query AdminPage($orderId: String!) {
		order(id: $orderId) {
			type
			id
			code
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AdminPageGQL extends Apollo.Query<AdminPageQuery, AdminPageQueryVariables> {
	override document = AdminPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
