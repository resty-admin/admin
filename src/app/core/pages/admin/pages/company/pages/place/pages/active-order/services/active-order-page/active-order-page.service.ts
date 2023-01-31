import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderPageService {
	readonly aciveOrderPageQuery = this._activeOrderPageGQL.watch();

	readonly activeOrder$ = this.aciveOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(private readonly _activeOrderPageGQL: ActiveOrderPageGQL) {}
}
