import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { EmployeesSkeletonComponent } from "./components";
import { EMPLOYEES_PAGE } from "./constants";
import { EmployeesComponent } from "./layout/employees.component";
import { EmployeesResolver } from "./resolvers";

export const EMPLOYEES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: EmployeesComponent,
		data: {
			animation: EMPLOYEES_PAGE
		},
		resolve: {
			employees: EmployeesResolver
		},
		skeleton: {
			component: EmployeesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(EMPLOYEES_ROUTES)],
	exports: [RouterModule]
})
export class EmployeesRoutingModule {}
