import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type SignInMutationVariables = Types.Exact<{
	body: Types.SignInInput;
}>;

export interface SignInMutation {
	__typename?: "Mutation";
	signIn: { __typename?: "AccessToken"; accessToken: string };
}

export type SignUpMutationVariables = Types.Exact<{
	body: Types.SignUpInput;
}>;

export interface SignUpMutation {
	__typename?: "Mutation";
	signUp: { __typename?: "AccessToken"; accessToken: string };
}

export type TelegramMutationVariables = Types.Exact<{
	telegramUser: Types.TelegramUserInput;
}>;

export interface TelegramMutation {
	__typename?: "Mutation";
	telegram: { __typename?: "AccessToken"; accessToken: string };
}

export type GoogleMutationVariables = Types.Exact<{
	telegramUser: Types.TelegramUserInput;
}>;

export interface GoogleMutation {
	__typename?: "Mutation";
	telegram: { __typename?: "AccessToken"; accessToken: string };
}

export type VerifyCodeMutationVariables = Types.Exact<{
	code: Types.Scalars["Int"];
}>;

export interface VerifyCodeMutation {
	__typename?: "Mutation";
	verifyCode: { __typename?: "AccessToken"; accessToken: string };
}

export type ResetPasswordMutationVariables = Types.Exact<{
	body: Types.ResetPasswordInput;
}>;

export interface ResetPasswordMutation {
	__typename?: "Mutation";
	resetPassword: { __typename?: "AccessToken"; accessToken: string };
}

export type ForgotPasswordMutationVariables = Types.Exact<{
	body: Types.ForgotPasswordInput;
}>;

export interface ForgotPasswordMutation {
	__typename?: "Mutation";
	forgotPassword: string;
}

export type GetMeQueryVariables = Types.Exact<Record<string, never>>;

export interface GetMeQuery {
	__typename?: "Query";
	getMe: { __typename?: "AccessToken"; accessToken: string };
}

export type UpdateMeMutationVariables = Types.Exact<{
	user: Types.UpdateMeInput;
}>;

export interface UpdateMeMutation {
	__typename?: "Mutation";
	updateMe: { __typename?: "UserEntity"; id: string };
}

export type DeleteMeMutationVariables = Types.Exact<Record<string, never>>;

export interface DeleteMeMutation {
	__typename?: "Mutation";
	deleteMe: string;
}

export type SendAgainMutationVariables = Types.Exact<Record<string, never>>;

export interface SendAgainMutation {
	__typename?: "Mutation";
	sendAgain: string;
}

export const SignInDocument = gql`
	mutation SignIn($body: SignInInput!) {
		signIn(body: $body) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SignInGQL extends Apollo.Mutation<SignInMutation, SignInMutationVariables> {
	override document = SignInDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const SignUpDocument = gql`
	mutation SignUp($body: SignUpInput!) {
		signUp(body: $body) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class SignUpGQL extends Apollo.Mutation<SignUpMutation, SignUpMutationVariables> {
	override document = SignUpDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const TelegramDocument = gql`
	mutation Telegram($telegramUser: TelegramUserInput!) {
		telegram(telegramUser: $telegramUser) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class TelegramGQL extends Apollo.Mutation<TelegramMutation, TelegramMutationVariables> {
	override document = TelegramDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GoogleDocument = gql`
	mutation Google($telegramUser: TelegramUserInput!) {
		telegram(telegramUser: $telegramUser) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GoogleGQL extends Apollo.Mutation<GoogleMutation, GoogleMutationVariables> {
	override document = GoogleDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const VerifyCodeDocument = gql`
	mutation VerifyCode($code: Int!) {
		verifyCode(code: $code) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class VerifyCodeGQL extends Apollo.Mutation<VerifyCodeMutation, VerifyCodeMutationVariables> {
	override document = VerifyCodeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ResetPasswordDocument = gql`
	mutation ResetPassword($body: ResetPasswordInput!) {
		resetPassword(body: $body) {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ResetPasswordGQL extends Apollo.Mutation<ResetPasswordMutation, ResetPasswordMutationVariables> {
	override document = ResetPasswordDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const ForgotPasswordDocument = gql`
	mutation ForgotPassword($body: ForgotPasswordInput!) {
		forgotPassword(body: $body)
	}
`;

@Injectable({
	providedIn: "root"
})
export class ForgotPasswordGQL extends Apollo.Mutation<ForgotPasswordMutation, ForgotPasswordMutationVariables> {
	override document = ForgotPasswordDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetMeDocument = gql`
	query GetMe {
		getMe {
			accessToken
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetMeGQL extends Apollo.Query<GetMeQuery, GetMeQueryVariables> {
	override document = GetMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const UpdateMeDocument = gql`
	mutation UpdateMe($user: UpdateMeInput!) {
		updateMe(user: $user) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class UpdateMeGQL extends Apollo.Mutation<UpdateMeMutation, UpdateMeMutationVariables> {
	override document = UpdateMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const DeleteMeDocument = gql`
	mutation DeleteMe {
		deleteMe
	}
`;

@Injectable({
	providedIn: "root"
})
export class DeleteMeGQL extends Apollo.Mutation<DeleteMeMutation, DeleteMeMutationVariables> {
	override document = DeleteMeDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const SendAgainDocument = gql`
	mutation SendAgain {
		sendAgain
	}
`;

@Injectable({
	providedIn: "root"
})
export class SendAgainGQL extends Apollo.Mutation<SendAgainMutation, SendAgainMutationVariables> {
	override document = SendAgainDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
