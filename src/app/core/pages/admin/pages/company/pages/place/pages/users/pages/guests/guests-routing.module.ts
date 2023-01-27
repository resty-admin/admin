import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmployeesComponent } from "@core/pages/admin/pages/company/pages/place/pages/users/pages/employees/layout/employees.component";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { GuestsSkeletonComponent } from "./components";
import { GUESTS_PAGE } from "./constants";
import { GuestsResolver } from "./resolvers";

export const GUESTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: EmployeesComponent,
		data: {
			animation: GUESTS_PAGE
		},
		resolve: {
			places: GuestsResolver
		},
		skeleton: {
			component: GuestsSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(GUESTS_ROUTES)],
	exports: [RouterModule]
})
export class GuestsRoutingModule {}
