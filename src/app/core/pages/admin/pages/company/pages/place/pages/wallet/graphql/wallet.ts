import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type PaymentsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface PaymentsQuery {
	__typename?: "Query";
	paymentSystems: {
		__typename?: "PaginatedPaymentSystem";
		page: number;
		totalCount: number;
		data?: { __typename?: "PaymentSystemEntity"; name: string; id: string }[] | null;
	};
}

export const PaymentsDocument = gql`
	query Payments($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
		paymentSystems(skip: $skip, take: $take, filtersArgs: $filtersArgs) {
			page
			totalCount
			data {
				name
				id
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class PaymentsGQL extends Apollo.Query<PaymentsQuery, PaymentsQueryVariables> {
	override document = PaymentsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
