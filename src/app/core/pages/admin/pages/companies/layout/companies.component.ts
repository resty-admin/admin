import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { filter, from, switchMap, take } from "rxjs";
import type { ICompany } from "src/app/shared/interfaces";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { CompaniesService } from "../../../../../../shared/modules/companies";
import { CompanyDialogComponent } from "../components";

@Component({
	selector: "app-companies",
	templateUrl: "./companies.component.html",
	styleUrls: ["./companies.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesComponent {
	readonly companies$ = this._companiesService.companies$;

	constructor(
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _companiesService: CompaniesService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	openAddCompanyDialog() {
		this._dialogService
			.open(CompanyDialogComponent)
			.afterClosed$.pipe(
				take(1),
				filter((company) => Boolean(company)),
				switchMap((company: Partial<ICompany>) =>
					this._companiesService.createCompany(company).pipe(take(1), this._toastrService.observe("Компании"))
				),
				switchMap(() => from(this._companiesService.refetchCompanies()))
			)
			.subscribe();
	}
}
