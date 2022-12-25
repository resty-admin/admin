import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { DYNAMIC_ID } from "src/app/shared/constants";
import type { ICompany } from "src/app/shared/interfaces";
import { ApiService } from "src/app/shared/modules/api";
import { ApolloService } from "src/app/shared/modules/apollo";

import { COMPANIES_ENDPOINTS } from "../../../../endpoints";
import { COMPANIES_QUERY, COMPANY_QUERY } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	readonly companiesQuery = this._apolloService.watchQuery<any>({
		query: COMPANIES_QUERY,
		variables: { take: 5, skip: 0 }
	});

	readonly companies$ = this.companiesQuery.valueChanges.pipe(map(({ data }) => data.companies.data));

	constructor(private readonly _apolloService: ApolloService, private readonly _apiService: ApiService) {}

	async refetchCompanies() {
		await this.companiesQuery.refetch();
	}

	getCompany(id: string) {
		return this._apolloService
			.watchQuery<any>({ query: COMPANY_QUERY, variables: { id } })
			.valueChanges.pipe(map(({ data }) => data.company));
	}

	createCompany(company: Partial<ICompany>) {
		return this._apiService.post<ICompany>(COMPANIES_ENDPOINTS.CREATE_COMPANY, company);
	}

	updateCompany(id: string, company: Partial<ICompany>) {
		return this._apiService.patch<ICompany>(COMPANIES_ENDPOINTS.UPDATE_COMPANY.replace(DYNAMIC_ID, id), company);
	}

	deleteCompany(id: string) {
		return this._apiService.delete<ICompany>(COMPANIES_ENDPOINTS.DELETE_COMPANY.replace(DYNAMIC_ID, id));
	}
}
