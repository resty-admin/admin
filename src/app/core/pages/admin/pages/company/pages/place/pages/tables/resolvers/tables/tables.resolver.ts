import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { TablesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class TablesResolver implements Resolve<any> {
	constructor(private _placesPageGQL: TablesPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.tables.data));
	}
}
