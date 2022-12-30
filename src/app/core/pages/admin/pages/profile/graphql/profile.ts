import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../graphql";
export type UserQueryVariables = Types.Exact<{
	userId: Types.Scalars["String"];
}>;

export interface UserQuery {
	__typename?: "Query";
	user: {
		__typename?: "UserEntity";
		email?: string | null;
		googleId?: string | null;
		id: string;
		name: string;
		password?: string | null;
		role: Types.UserRoleEnum;
		status: Types.UserStatusEnum;
		tel?: string | null;
		telegramId?: number | null;
		telegramToken?: string | null;
		theme: Types.ThemeEnum;
		verificationCode?: number | null;
	};
}

export const UserDocument = gql`
	query User($userId: String!) {
		user(id: $userId) {
			email
			googleId
			id
			name
			password
			role
			status
			tel
			telegramId
			telegramToken
			theme
			verificationCode
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
	override document = UserDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
