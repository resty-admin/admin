import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { PaymentSystemsGQL } from "../../graphql/payment-systems";

@Injectable({ providedIn: "root" })
export class PaymentSystemsService {
	private readonly _paymentSystemsQuery = this._paymentSystemsGQL.watch({ skip: 0, take: 5 });

	readonly paymentSystems$ = this._paymentSystemsQuery.valueChanges.pipe(
		map((result) => result.data.paymentSystems.data)
	);

	constructor(private readonly _paymentSystemsGQL: PaymentSystemsGQL) {}
}
