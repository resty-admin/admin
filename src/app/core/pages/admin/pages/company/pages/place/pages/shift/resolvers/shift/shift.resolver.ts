import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { ShiftHallsGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ShiftResolver implements Resolve<any> {
	constructor(private _shiftHallsGQL: ShiftHallsGQL) {}

	resolve(): Observable<any> {
		return this._shiftHallsGQL.watch().valueChanges.pipe(map((result) => result.data.halls.data));
	}
}
