import { Injectable } from "@angular/core";
import { gql } from "apollo-angular";
import * as Apollo from "apollo-angular";

import type * as Types from "../../../../../../../../../../../graphql";
export type PaymentSystemsPageQueryVariables = Types.Exact<{
	filtersArgs?: Types.InputMaybe<Types.FiltersArgsDto | Types.FiltersArgsDto[]>;
	take?: Types.InputMaybe<Types.Scalars["Int"]>;
	skip?: Types.InputMaybe<Types.Scalars["Int"]>;
}>;

export interface PaymentSystemsPageQuery {
	__typename?: "Query";
	paymentSystems: {
		__typename?: "PaginatedPaymentSystem";
		page: number;
		totalCount: number;
		data?: { __typename?: "PaymentSystemEntity"; id: string; name: string }[] | null;
	};
}

export const PaymentSystemsPageDocument = gql`
	query PaymentSystemsPage($filtersArgs: [FiltersArgsDto!], $take: Int, $skip: Int) {
		paymentSystems(filtersArgs: $filtersArgs, take: $take, skip: $skip) {
			page
			totalCount
			data {
				id
				name
			}
		}
	}
`;

@Injectable({
	providedIn: "root"
})
export class PaymentSystemsPageGQL extends Apollo.Query<PaymentSystemsPageQuery, PaymentSystemsPageQueryVariables> {
	override document = PaymentSystemsPageDocument;

	constructor(apollo: Apollo.Apollo) {
		super(apollo);
	}
}
