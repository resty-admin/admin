import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { EmployeesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class EmployeesResolver implements Resolve<any> {
	constructor(private _placesPageGQL: EmployeesPageGQL) {}

	resolve(): Observable<any> {
		return this._placesPageGQL.watch().valueChanges.pipe(map((result) => result.data.users.data));
	}
}
