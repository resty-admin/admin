import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ActiveOrdersPageSkeletonComponent } from "./components";
import { ACTIVE_ORDERS_PAGE } from "./constants";
import { ActiveOrdersComponent } from "./layout/active-orders.component";
import { ActiveOrdersPageResolver } from "./resolvers";

export const ACTIVE_ORDERS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ActiveOrdersComponent,
		data: {
			animation: ACTIVE_ORDERS_PAGE
		},
		resolve: {
			activeOrders: ActiveOrdersPageResolver
		},
		skeleton: {
			component: ActiveOrdersPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACTIVE_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class ActiveOrdersRoutingModule {}
