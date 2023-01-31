import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { EmployeesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class EmployeesPageService {
	readonly employeesPageQuery = this._employeesPageGQL.watch();

	readonly employees$ = this.employeesPageQuery.valueChanges.pipe(map((result) => result.data.users.data));

	constructor(private readonly _employeesPageGQL: EmployeesPageGQL) {}
}
