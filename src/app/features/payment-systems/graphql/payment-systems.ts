import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../graphql";
export type PaymentSystemsQueryVariables = Types.Exact<{
	skip: Types.Scalars["Int"];
	take: Types.Scalars["Int"];
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto>;
}>;

export interface PaymentSystemsQuery {
	__typename?: "Query";
	paymentSystems: {
		__typename?: "PaginatedPaymentSystem";
		page: number;
		totalCount: number;
		data?: { __typename?: "PaymentSystemEntity"; name: string; id: string }[] | null;
	};
}

export const PaymentSystemsDocument = gql`
	query PaymentSystems($skip: Int!, $take: Int!, $filtersArgs: FiltersArgsDto) {
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
export class PaymentSystemsGQL extends Apollo.Query<PaymentSystemsQuery, PaymentSystemsQueryVariables> {
	override document = PaymentSystemsDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
