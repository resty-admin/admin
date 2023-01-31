import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { StatisticPageSkeletonComponent } from "./components";
import { STATISTIC_PAGE } from "./constants";
import { StatisticComponent } from "./layout/statistic.component";
import { StatisticPageResolver } from "./resolvers";

export const STATISTIC_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: StatisticComponent,
		data: {
			animation: STATISTIC_PAGE
		},
		resolve: {
			statistic: StatisticPageResolver
		},
		skeleton: {
			component: StatisticPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(STATISTIC_ROUTES)],
	exports: [RouterModule]
})
export class StatisticRoutingModule {}
