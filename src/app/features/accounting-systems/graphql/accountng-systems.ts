import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ConnectAccountingSystemToPlaceMutationVariables = Types.Exact<{
	body: Types.ConnectAccountingSystemToPlaceInput;
}>;

export interface ConnectAccountingSystemToPlaceMutation {
	__typename?: "Mutation";
	connectAccountingSystemToPlace: { __typename?: "PlaceToAccountingSystemEntity"; id: string };
}

export type GetMerchantLoginAndCodeLinkMutationVariables = Types.Exact<{
	placeId: Types.Scalars["String"];
}>;

export interface GetMerchantLoginAndCodeLinkMutation {
	__typename?: "Mutation";
	getMerchantLoginAndCodeLink: { __typename?: "Link"; link: string };
}

export const ConnectAccountingSystemToPlaceDocument = gql`
	mutation ConnectAccountingSystemToPlace($body: ConnectAccountingSystemToPlaceInput!) {
		connectAccountingSystemToPlace(body: $body) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConnectAccountingSystemToPlaceGQL extends Apollo.Mutation<
	ConnectAccountingSystemToPlaceMutation,
	ConnectAccountingSystemToPlaceMutationVariables
> {
	override document = ConnectAccountingSystemToPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
export const GetMerchantLoginAndCodeLinkDocument = gql`
	mutation GetMerchantLoginAndCodeLink($placeId: String!) {
		getMerchantLoginAndCodeLink(placeId: $placeId) {
			link
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class GetMerchantLoginAndCodeLinkGQL extends Apollo.Mutation<
	GetMerchantLoginAndCodeLinkMutation,
	GetMerchantLoginAndCodeLinkMutationVariables
> {
	override document = GetMerchantLoginAndCodeLinkDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
