import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { StatisticSkeletonComponent } from "./components";
import { STATISTIC_PAGE } from "./constants";
import { StatisticComponent } from "./layout/statistic.component";
import { StatisticResolver } from "./resolvers";

export const STATISTIC_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: StatisticComponent,
		data: {
			animation: STATISTIC_PAGE
		},
		resolve: {
			places: StatisticResolver
		},
		skeleton: {
			component: StatisticSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(STATISTIC_ROUTES)],
	exports: [RouterModule]
})
export class StatisticRoutingModule {}
