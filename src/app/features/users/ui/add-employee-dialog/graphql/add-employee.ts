import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../graphql";
export type AddEmployeeFindUserQueryVariables = Types.Exact<{
	userId: Types.Scalars["String"];
}>;

export interface AddEmployeeFindUserQuery {
	__typename?: "Query";
	user: { __typename?: "UserEntity"; id: string };
}

export const AddEmployeeFindUserDocument = gql`
	query AddEmployeeFindUser($userId: String!) {
		user(id: $userId) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class AddEmployeeFindUserGQL extends Apollo.Query<AddEmployeeFindUserQuery, AddEmployeeFindUserQueryVariables> {
	override document = AddEmployeeFindUserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
