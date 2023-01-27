import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { CompaniesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CompaniesResolver implements Resolve<any> {
	constructor(private _companiesPageGQL: CompaniesPageGQL) {}

	resolve(): Observable<any> {
		return this._companiesPageGQL.watch().valueChanges.pipe(map((result) => result.data.companies.data));
	}
}
