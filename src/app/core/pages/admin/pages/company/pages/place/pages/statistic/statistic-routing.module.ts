import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { StatisticComponent } from "./layout/statistic.component";

export const STATISTIC_ROUTES: Route[] = [
	{
		path: "",
		component: StatisticComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(STATISTIC_ROUTES)],
	exports: [RouterModule]
})
export class StatisticRoutingModule {}
