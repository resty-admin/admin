import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../graphql";
export type GetAccountingSystemQueryVariables = Types.Exact<{
	id: Types.Scalars["String"];
}>;

export interface GetAccountingSystemQuery {
	__typename?: "Query";
	accountingSystem: { __typename?: "AccountingSystemEntity"; id: string; name: string };
}

export const GetAccountingSystemDocument = gql`
	query getAccountingSystem($id: String!) {
		accountingSystem(id: $id) {
			id
			name
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetAccountingSystemGQL extends Apollo.Query<GetAccountingSystemQuery, GetAccountingSystemQueryVariables> {
	document = GetAccountingSystemDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
