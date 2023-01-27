import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { STATISTIC_PAGE } from "./constants";
import { StatisticComponent } from "./layout/statistic.component";

export const STATISTIC_ROUTES: Route[] = [
	{
		path: "",
		component: StatisticComponent,
		data: {
			animation: STATISTIC_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(STATISTIC_ROUTES)],
	exports: [RouterModule]
})
export class StatisticRoutingModule {}
