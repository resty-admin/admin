import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ActiveOrderPageSkeletonComponent } from "./components";
import { ACTIVE_ORDER_PAGE } from "./constants";
import { ActiveOrderComponent } from "./layout/active-order.component";
import { ActiveOrderPageResolver } from "./resolvers";

export const ACTIVE_ORDER_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ActiveOrderComponent,
		data: {
			animation: ACTIVE_ORDER_PAGE
		},
		resolve: {
			activeOrder: ActiveOrderPageResolver
		},
		skeleton: {
			component: ActiveOrderPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACTIVE_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class ActiveOrderRoutingModule {}
