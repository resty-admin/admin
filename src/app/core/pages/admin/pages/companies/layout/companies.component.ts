import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CompaniesService } from "@features/companies";
import { CompanyDialogComponent } from "@features/companies/ui/company-dialog/layout/company-dialog.component";
import type { CompanyEntity, CreateCommandInput } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { COMPANIES_PAGE } from "../constants";
import { CompaniesPageGQL } from "../graphql";

@UntilDestroy()
@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent implements OnInit {
	readonly companiesPage = COMPANIES_PAGE;
	private readonly _companiesPageQuery = this._companiesPageGQL.watch();
	readonly companies$ = this._activatedRoute.data.pipe(map((data) => data["companies"]));

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _companiesPageGQL: CompaniesPageGQL,
		private readonly _companiesService: CompaniesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._companiesService.changes$.pipe(untilDestroyed(this)).subscribe(async () => {
			await this._companiesPageQuery.refetch();
		});
	}

	async openCreateCompanyDialog(data?: Partial<CreateCommandInput>) {
		const company: CompanyEntity = await lastValueFrom(
			this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$
		);

		if (!company) {
			return;
		}

		const result = await lastValueFrom(
			this._companiesService
				.createCompany({ name: company.name, logo: company.logo?.id })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.companiesPage),
						this._i18nService.translate("title", {}, this.companiesPage)
					)
				)
		);

		if (!result?.data?.createCompany) {
			return;
		}

		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, result.data.createCompany.id)
		);
	}
}
