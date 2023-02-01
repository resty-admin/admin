import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { CompaniesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CompaniesPageResolver implements Resolve<unknown> {
	constructor(private readonly _companiesPageGQL: CompaniesPageGQL) {}

	resolve() {
		return this._companiesPageGQL.fetch();
	}
}
