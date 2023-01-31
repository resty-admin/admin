import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import type { PaymentSystemsPageQuery } from "../../graphql";
import { PaymentSystemsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class PaymentSystemsPageResolver implements Resolve<PaymentSystemsPageQuery["paymentSystems"]["data"]> {
	constructor(private readonly _paymentSystemsPageService: PaymentSystemsPageService) {}

	resolve() {
		return this._paymentSystemsPageService.paymentSystems$;
	}
}
