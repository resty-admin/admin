import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	connectPaymentSystemToPlace(body: unknown) {
		return of(body);
	}
}
