import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";
import { ChangesEnum } from "src/app/shared/enums";

import type { CompanyEntity, CreateCommandInput, CreateCompanyInput, UpdateCompanyInput } from "../../../../../graphql";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CompaniesGQL, CreateCompanyGQL, DeleteCompanyGQL, UpdateCompanyGQL } from "../../graphql/companies";
import { CompanyDialogComponent } from "../../ui/company-dialog/layout/company-dialog.component";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	readonly companiesQuery = this._companiesGQL.watch();
	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	readonly actions: IAction<CompanyEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (company) => this.openUpdateCompanyDialog(company).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (company) => this.openDeleteCompanyDialog(company).pipe(take(1)).subscribe()
		}
	];

	constructor(
		private readonly _companiesGQL: CompaniesGQL,
		private readonly _createCompanyGQL: CreateCompanyGQL,
		private readonly _updateCompanyGQL: UpdateCompanyGQL,
		private readonly _deleteCompanyGQL: DeleteCompanyGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateCompanyDialog(data?: Partial<CreateCommandInput>) {
		return this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((company) => Boolean(company)),
			switchMap((company: CompanyEntity) => this.createCompany({ name: company.name, logo: company.logo?.id }))
		);
	}

	openUpdateCompanyDialog(data: AtLeast<CompanyEntity, "id">) {
		return this._dialogService.open(CompanyDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((company) => Boolean(company)),
			switchMap((company: CompanyEntity) =>
				this.updateCompany({ id: company.id, name: company.name, logo: company.logo?.id })
			)
		);
	}

	openDeleteCompanyDialog(data: AtLeast<CompanyEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить компанию?", value: data } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((company) => Boolean(company)),
			switchMap((company) => this.deleteCompany(company.id))
		);
	}

	createCompany(company: CreateCompanyInput) {
		return this._createCompanyGQL.mutate({ company }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateCompany(company: UpdateCompanyInput) {
		return this._updateCompanyGQL.mutate({ company }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteCompany(companyId: string) {
		return this._deleteCompanyGQL.mutate({ companyId }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}
}
