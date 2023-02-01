import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { PaymentSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentSystemsPageResolver implements Resolve<unknown> {
	constructor(private readonly _paymentSystemsPageGQL: PaymentSystemsPageGQL) {}

	resolve() {
		return this._paymentSystemsPageGQL.fetch();
	}
}
