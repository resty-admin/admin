import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { EmployeesPageSkeletonComponent } from "./components";
import { EmployeesComponent } from "./layout/employees.component";
import { EmployeesPageResolver } from "./resolvers";

export const EMPLOYEES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: EmployeesComponent,
		data: {
			animation: "employeesPage"
		},
		resolve: {
			employees: EmployeesPageResolver
		},
		skeleton: {
			component: EmployeesPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(EMPLOYEES_ROUTES)],
	exports: [RouterModule]
})
export class EmployeesRoutingModule {}
