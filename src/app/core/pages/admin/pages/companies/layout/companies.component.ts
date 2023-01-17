import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { CompaniesService } from "../../../../../../features/companies";
import { ADMIN_ROUTES, COMPANY_ID } from "../../../../../../shared/constants";
import { RouterService } from "../../../../../../shared/modules/router";
import { COMPANIES_PAGE_I18N } from "../constants/companies-page-i18n.constant";

@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent {
	readonly companiesPageI18n = COMPANIES_PAGE_I18N;
	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	constructor(private readonly _companiesService: CompaniesService, private readonly _routerService: RouterService) {}

	trackByFn(index: number) {
		return index;
	}

	async openCreateCompanyDialog() {
		const result = await this._companiesService.openCreateCompanyDialog();

		if (!result?.data?.createCompany) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, result.data.createCompany.id)
		);
	}
}
