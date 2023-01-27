import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderResolver implements Resolve<any> {
	constructor(private _placesPageGQL: HistoryOrderPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.order));
	}
}
