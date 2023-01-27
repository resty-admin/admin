import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { GuestsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class GuestsResolver implements Resolve<any> {
	constructor(private _placesPageGQL: GuestsPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.users.data));
	}
}
