import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { PaymentSystemsGQL } from "../../graphql/payment-systems";

@Injectable({ providedIn: "root" })
export class PaymentSystemsService {
	readonly paymentSystems$ = this._paymentSystemsGQL
		.watch()
		.valueChanges.pipe(map((result) => result.data.paymentSystems.data));

	constructor(private readonly _paymentSystemsGQL: PaymentSystemsGQL) {}

	async refetch() {
		await this._paymentSystemsGQL.watch().refetch();
	}
}
