import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CompaniesService, CompanyDialogComponent } from "@features/companies";
import type { CreateCommandInput } from "@graphql";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, COMPANY_ID } from "@shared/constants";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { COMPANIES_PAGE } from "../constants";
import { CompaniesPageService } from "../services";

@UntilDestroy()
@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent implements OnInit {
	readonly companiesPage = COMPANIES_PAGE;
	readonly companies$ = this._companiesPageService.companies$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _companiesPageService: CompaniesPageService,
		private readonly _companiesService: CompaniesService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	ngOnInit() {
		this._companiesService.changes$
			.pipe(
				untilDestroyed(this),
				switchMap(() => from(this._companiesPageService.companiesPageQuery.refetch()))
			)
			.subscribe(() => {});
	}

	openCreateCompanyDialog(data?: Partial<CreateCommandInput>) {
		this._dialogService
			.open(CompanyDialogComponent, { data })
			.afterClosed$.pipe(
				filter((company) => Boolean(company)),
				switchMap((company) =>
					this._companiesService.createCompany({ name: company.name, logo: company.logo?.id }).pipe(
						switchMap((result) =>
							from(this._companiesPageService.companiesPageQuery.refetch()).pipe(map(() => result.data?.createCompany))
						),
						this._toastrService.observe(this._i18nService.translate("createCompany"))
					)
				),
				take(1)
			)
			.subscribe(async (company) => {
				if (!company) {
					return;
				}

				await this._routerService.navigateByUrl(ADMIN_ROUTES.COMPANY.absolutePath.replace(COMPANY_ID, company.id));
			});
	}
}
