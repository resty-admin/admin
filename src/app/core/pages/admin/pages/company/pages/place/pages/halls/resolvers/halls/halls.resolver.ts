import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { HallsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsResolver implements Resolve<any> {
	constructor(private _hallsPageGQL: HallsPageGQL) {}

	resolve(): Observable<any> {
		return this._hallsPageGQL.watch().valueChanges.pipe(map((result) => result.data.halls.data));
	}
}
