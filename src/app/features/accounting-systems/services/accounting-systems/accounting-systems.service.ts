import { Injectable } from "@angular/core";
import type { ConnectAccountingSystemToPlaceInput } from "@graphql";

import { ConnectAccountingSystemToPlaceGQL, GetMerchantLoginAndCodeLinkGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	constructor(
		private readonly _connectAccountingSystemToPlaceGQL: ConnectAccountingSystemToPlaceGQL,
		private readonly _getMerchantLoginAndCodeLink: GetMerchantLoginAndCodeLinkGQL
	) {}

	connectPaymentSystemToPlace(body: ConnectAccountingSystemToPlaceInput) {
		return this._connectAccountingSystemToPlaceGQL.mutate({ body });
	}

	getMerchantLoginAndCodeLink(placeId: string) {
		return this._getMerchantLoginAndCodeLink.mutate({ placeId });
	}
}
