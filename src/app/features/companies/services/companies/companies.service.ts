import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { Subject, tap } from "rxjs";
import { ChangesEnum } from "src/app/shared/enums";

import type { CreateCompanyInput, UpdateCompanyInput } from "../../../../../graphql";
import { CreateCompanyGQL, DeleteCompanyGQL, UpdateCompanyGQL } from "../../graphql/companies";

@Injectable({ providedIn: "root" })
export class CompaniesService {
	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createCompanyGQL: CreateCompanyGQL,
		private readonly _updateCompanyGQL: UpdateCompanyGQL,
		private readonly _deleteCompanyGQL: DeleteCompanyGQL
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
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
