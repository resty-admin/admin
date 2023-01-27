import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { PaymentSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentSystemsResolver implements Resolve<any> {
	constructor(private _paymentSystemsPageGQL: PaymentSystemsPageGQL) {}

	resolve(): Observable<any> {
		return this._paymentSystemsPageGQL.watch().valueChanges.pipe(map((result) => result.data.paymentSystems.data));
	}
}
