import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, map } from "rxjs";

import type { CompanyEntity, CreateCommandInput } from "../../../../../../../graphql";
import { CompaniesService } from "../../../../../../features/companies";
import { CompanyDialogComponent } from "../../../../../../features/companies/ui/company-dialog/layout/company-dialog.component";
import { ADMIN_ROUTES, COMPANY_ID } from "../../../../../../shared/constants";
import { RouterService } from "../../../../../../shared/modules/router";
import { DialogService } from "../../../../../../shared/ui/dialog";
import { COMPANIES_PAGE_I18N } from "../constants/companies-page-i18n.constant";
import { CompaniesPageGQL } from "../graphql/companies-page";

@UntilDestroy()
@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent implements OnInit {
	readonly companiesPageI18n = COMPANIES_PAGE_I18N;
	private readonly _companiesPageQuery = this._companiesPageGQL.watch();
	readonly companies$ = this._companiesPageQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(
		private readonly _companiesPageGQL: CompaniesPageGQL,
		private readonly _companiesService: CompaniesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService
	) {}

	ngOnInit() {
		this._companiesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._companiesPageQuery.refetch();
		});
	}

	trackByFn(index: number) {
		return index;
	}

	async openCreateCompanyDialog(data?: Partial<CreateCommandInput>) {
		const company: CompanyEntity = await lastValueFrom(
			this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$
		);

		if (!company) {
			return;
		}

		const result = await lastValueFrom(
			this._companiesService.createCompany({ name: company.name, logo: company.logo?.id })
		);

		if (!result?.data?.createCompany) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, result.data.createCompany.id)
		);
	}
}
