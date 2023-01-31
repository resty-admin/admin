import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { PaymentSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PaymentSystemsPageService {
	readonly paymentSystemsPageQuery = this._paymentSystemsPageGQL.watch();

	readonly paymentSystems$ = this.paymentSystemsPageQuery.valueChanges.pipe(
		map((result) => result.data.paymentSystems.data)
	);

	constructor(private readonly _paymentSystemsPageGQL: PaymentSystemsPageGQL) {}
}
