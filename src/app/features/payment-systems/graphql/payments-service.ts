import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type ConnectPaymentSystemToPlaceMutationVariables = Types.Exact<{
	body: Types.ConnectPaymentSystemToPlaceInput;
}>;

export interface ConnectPaymentSystemToPlaceMutation {
	__typename?: "Mutation";
	connectPaymentSystemToPlace: { __typename?: "PlaceToPaymentSystemEntity"; id: string };
}

export const ConnectPaymentSystemToPlaceDocument = gql`
	mutation ConnectPaymentSystemToPlace($body: ConnectPaymentSystemToPlaceInput!) {
		connectPaymentSystemToPlace(body: $body) {
			id
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class ConnectPaymentSystemToPlaceGQL extends Apollo.Mutation<
	ConnectPaymentSystemToPlaceMutation,
	ConnectPaymentSystemToPlaceMutationVariables
> {
	override document = ConnectPaymentSystemToPlaceDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
