import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { WalletPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class WalletPageService {
	readonly walletPageQuery = this._walletPageGQL.watch();

	readonly statistic$ = this.walletPageQuery.valueChanges.pipe(map((result) => result.data.getPlaceStatistic));

	constructor(private readonly _walletPageGQL: WalletPageGQL) {}
}
