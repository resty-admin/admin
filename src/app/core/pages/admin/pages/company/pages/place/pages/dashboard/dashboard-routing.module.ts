import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./layout/dashboard.component";

export const DASHBOARD_ROUTES: Route[] = [
	{
		path: "",
		component: DashboardComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(DASHBOARD_ROUTES)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}
