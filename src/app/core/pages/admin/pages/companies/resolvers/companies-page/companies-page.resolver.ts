import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";

import type { CompaniesPageQuery } from "../../graphql";
import { CompaniesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CompaniesPageResolver implements Resolve<ApolloQueryResult<CompaniesPageQuery>> {
	constructor(private readonly _companiesPageGQL: CompaniesPageGQL) {}

	resolve() {
		return this._companiesPageGQL.fetch();
	}
}
