import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateCompanyInput, UpdateCompanyInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CompaniesGQL, CreateCompanyGQL, DeleteCompanyGQL, UpdateCompanyGQL } from "../../graphql/companies";
import { CompanyDialogComponent } from "../../ui/company-dialog/layout/company-dialog.component";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	readonly companiesQuery = this._companiesGQL.watch();

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (company?: any) => this.openUpdateCompanyDialog(company).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (company?: any) => {
				if (!company) {
					return;
				}

				this.openDeleteCompanyDialog(company).pipe(take(1)).subscribe();
			}
		}
	];

	constructor(
		private readonly _companiesGQL: CompaniesGQL,
		private readonly _createCompanyGQL: CreateCompanyGQL,
		private readonly _updateCompanyGQL: UpdateCompanyGQL,
		private readonly _deleteCompanyGQL: DeleteCompanyGQL,
		private readonly _filesService: FilesService,
		private readonly _dialogService: DialogService
	) {}

	openCreateCompanyDialog(data?: any) {
		return this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((company) => Boolean(company)),
			switchMap((company) => this.createCompany(company))
		);
	}

	openUpdateCompanyDialog(data: any) {
		return this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((company) => Boolean(company)),
			switchMap((company) => this.updateCompany(company))
		);
	}

	openDeleteCompanyDialog(value: any) {
		const config = { data: { title: "Вы уверены, что хотите удалить компанию?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((company) => Boolean(company)),
			switchMap((company) => this.deleteCompany(company.id))
		);
	}

	createCompany(company: CreateCompanyInput) {
		return this._filesService.getFile(company.logo).pipe(
			take(1),
			switchMap((logo) => this._createCompanyGQL.mutate({ company: { ...company, logo: logo?.id } }))
		);
	}

	updateCompany(company: UpdateCompanyInput) {
		return this._filesService.getFile(company.logo).pipe(
			take(1),
			switchMap((logo) => this._updateCompanyGQL.mutate({ company: { ...company, logo: logo?.id } }))
		);
	}

	deleteCompany(companyId: string) {
		return this._deleteCompanyGQL.mutate({ companyId });
	}
}
