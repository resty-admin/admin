import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { EmployeesComponent } from "./layout/employees.component";

export const EMPLOYEES_ROUTES: Route[] = [
	{
		path: "",
		component: EmployeesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(EMPLOYEES_ROUTES)],
	exports: [RouterModule]
})
export class EmployeesRoutingModule {}
