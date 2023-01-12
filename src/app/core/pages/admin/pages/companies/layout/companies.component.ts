import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map, take } from "rxjs";

import { CompaniesService } from "../../../../../../features/companies";
import { ADMIN_ROUTES, COMPANY_ID } from "../../../../../../shared/constants";
import { RouterService } from "../../../../../../shared/modules/router";

@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent {
	readonly companies$ = this._companiesService.companiesQuery.valueChanges.pipe(
		map((result) => result.data.companies.data)
	);

	constructor(private readonly _companiesService: CompaniesService, private readonly _routerService: RouterService) {}

	openCreateCompanyDialog() {
		this._companiesService
			.openCreateCompanyDialog()
			.pipe(
				take(1),
				map((result) => result.data?.createCompany)
			)
			.subscribe(async (company) => {
				if (!company) {
					return;
				}

				await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, company.id));
			});
	}
}
