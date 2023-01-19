import { Injectable } from "@angular/core";
import { of } from "rxjs";

import { ConnectPaymentSystemToPlaceGQL } from "../../graphql/accountng-systems-service";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	constructor(private readonly _connectPaymentSystemToPlaceGQL: ConnectPaymentSystemToPlaceGQL) {}

	connectPaymentSystemToPlace(body: unknown) {
		console.log("hey", body);

		return of(body);
	}
}