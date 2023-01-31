import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";

import type { PaymentSystemsPageQuery } from "../../graphql";
import { PaymentSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentSystemsPageResolver implements Resolve<ApolloQueryResult<PaymentSystemsPageQuery>> {
	constructor(private readonly _paymentSystemsPageGQL: PaymentSystemsPageGQL) {}

	resolve() {
		return this._paymentSystemsPageGQL.fetch();
	}
}
