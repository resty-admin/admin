import { Injectable } from "@angular/core";
import { of } from "rxjs";

import { ConnectPaymentSystemToPlaceGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	constructor(private readonly _connectPaymentSystemToPlaceGQL: ConnectPaymentSystemToPlaceGQL) {}

	connectPaymentSystemToPlace(body: unknown) {
		return of(body);
	}
}
