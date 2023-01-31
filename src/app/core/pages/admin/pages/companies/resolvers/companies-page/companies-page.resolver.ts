import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import type { CompaniesPageQuery } from "../../graphql";
import { CompaniesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class CompaniesPageResolver implements Resolve<CompaniesPageQuery["companies"]["data"]> {
	constructor(private readonly _companiesPageService: CompaniesPageService) {}

	resolve() {
		return this._companiesPageService.companies$;
	}
}
