import { Injectable } from "@angular/core";

import type { ConnectPaymentSystemToPlaceInput } from "../../../../../graphql";
import { ConnectPaymentSystemToPlaceGQL } from "../../graphql/payments-service";

@Injectable({ providedIn: "root" })
export class PaymentSystemsService {
	constructor(private readonly _connectPaymentSystemToPlaceGQL: ConnectPaymentSystemToPlaceGQL) {}

	connectPaymentSystemToPlace(body: ConnectPaymentSystemToPlaceInput) {
		return this._connectPaymentSystemToPlaceGQL.mutate({ body });
	}
}
