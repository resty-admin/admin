import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";

import type { CreateCompanyInput, UpdateCompanyInput } from "../../../../../graphql";
import { FilesService } from "../../../../shared/modules/files";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CompanyDialogComponent } from "../../components";
import { CompaniesGQL, CreateCompanyGQL, DeleteCompanyGQL, UpdateCompanyGQL } from "../../graphql/companies";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	private readonly _companiesQuery = this._companiesGQL.watch({ skip: 0, take: 10 });
	readonly companies$ = this._companiesQuery.valueChanges.pipe(map((result) => result.data.companies.data));

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (company?: any) => this.openCreateOrUpdateCompanyDialog(company).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (company?: any) => {
				if (!company) {
					return;
				}

				this.openDeleteCompanyDialog(company).subscribe();
			}
		}
	];

	constructor(
		private readonly _companiesGQL: CompaniesGQL,
		private readonly _createCompanyGQL: CreateCompanyGQL,
		private readonly _updateCompanyGQL: UpdateCompanyGQL,
		private readonly _deleteCompanyGQL: DeleteCompanyGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _filesService: FilesService
	) {}

	openCreateOrUpdateCompanyDialog(data?: any) {
		return this._dialogService.openFormDialog(CompanyDialogComponent, { data }).pipe(
			switchMap((company: any) =>
				company.id
					? this.updateCompany({
							id: company.id,
							name: company.name,
							logo: company.logo
					  })
					: this.createCompany(company)
			)
		);
	}

	openDeleteCompanyDialog(company: any) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить компанию?",
					value: company
				}
			})
			.pipe(switchMap((company) => this.deleteCompany(company.id)));
	}

	createCompany(company: CreateCompanyInput) {
		return this._filesService.getFile(company.logo).pipe(
			switchMap((logo) => this._createCompanyGQL.mutate({ company: { ...company, logo: logo?.id } })),
			map((result) => result.data?.createCompany),
			take(1),
			this._toastrService.observe("Компании"),
			tap(async () => {
				await this._companiesQuery.refetch();
			})
		);
	}

	updateCompany(company: UpdateCompanyInput) {
		return this._filesService.getFile(company.logo).pipe(
			switchMap((logo) => this._updateCompanyGQL.mutate({ company: { ...company, logo: logo?.id } })),
			map((result) => result.data?.updateCompany),
			take(1),
			this._toastrService.observe("Компании"),
			tap(async () => {
				await this._companiesQuery.refetch();
			})
		);
	}

	deleteCompany(companyId: string) {
		return this._deleteCompanyGQL.mutate({ companyId }).pipe(
			take(1),
			this._toastrService.observe("Компании"),
			tap(async () => {
				await this._companiesQuery.refetch();
			})
		);
	}
}
