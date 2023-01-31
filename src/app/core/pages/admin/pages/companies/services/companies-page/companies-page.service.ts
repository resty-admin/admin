import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { CompaniesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CompaniesPageService {
	readonly companiesPageQuery = this._companiesPageGQL.watch();

	readonly companies$ = this.companiesPageQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(private readonly _companiesPageGQL: CompaniesPageGQL) {}
}
