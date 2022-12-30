import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";

import type { CreateCompanyInput, UpdateCompanyInput } from "../../../../../graphql";
import type { ICompany } from "../../../../shared/interfaces";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CompanyDialogComponent } from "../../components";
import { CompaniesGQL, CreateCompanyGQL, DeleteCompanyGQL, UpdateCompanyGQL } from "../../graphql/companies";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	readonly companies$ = this._companiesGQL.watch().valueChanges.pipe(map((result) => result.data.companies.data));

	constructor(
		private readonly _companiesGQL: CompaniesGQL,
		private readonly _createCompanyGQL: CreateCompanyGQL,
		private readonly _updateCompanyGQL: UpdateCompanyGQL,
		private readonly _deleteCompanyGQL: DeleteCompanyGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._companiesGQL.watch().refetch();
	}

	openCreateOrUpdateCompanyDialog() {
		return this._dialogService
			.openFormDialog(CompanyDialogComponent)
			.pipe(switchMap((company: ICompany) => (company.id ? this.updateCompany(company) : this.createCompany(company))));
	}

	openDeleteCompanyDialog() {}

	createCompany(company: CreateCompanyInput) {
		return this._createCompanyGQL.mutate({ company }).pipe(
			take(1),
			this._toastrService.observe("Компании"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateCompany(company: UpdateCompanyInput) {
		return this._updateCompanyGQL.mutate({ company }).pipe(
			take(1),
			this._toastrService.observe("Компании"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteCompany(companyId: string) {
		return this._deleteCompanyGQL.mutate({ companyId }).pipe(
			take(1),
			this._toastrService.observe("Компании"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
