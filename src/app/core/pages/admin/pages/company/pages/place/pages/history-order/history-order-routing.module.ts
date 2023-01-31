import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { HistoryOrderPageSkeletonComponent } from "./components";
import { HISTORY_ORDER_PAGE } from "./constants";
import { HistoryOrderComponent } from "./layout/history-order.component";
import { HistoryOrderPageResolver } from "./resolvers";

export const HISTORY_ORDER_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: HistoryOrderComponent,
		data: {
			animation: HISTORY_ORDER_PAGE
		},
		resolve: {
			historyOrder: HistoryOrderPageResolver
		},
		skeleton: {
			component: HistoryOrderPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(HISTORY_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class HistoryOrderRoutingModule {}
