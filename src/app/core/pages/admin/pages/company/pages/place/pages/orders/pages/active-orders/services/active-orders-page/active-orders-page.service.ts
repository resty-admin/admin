import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ActiveOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrdersPageService {
	readonly activeOrdersPageQuery = this._activeOrdersPageGQL.watch();

	readonly activeOrders$ = this.activeOrdersPageQuery.valueChanges.pipe(map((result) => result.data.orders.data));

	constructor(private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL) {}
}
