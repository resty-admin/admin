import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentSystemsPageSkeletonComponent } from "./components";
import { PAYMENT_SYSTEMS_PAGE } from "./constants";
import { PaymentSystemsComponent } from "./layout/payment-systems.component";
import { PaymentSystemsPageResolver } from "./resolvers";

export const PAYMENT_SYSTEMS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentSystemsComponent,
		data: {
			animation: PAYMENT_SYSTEMS_PAGE
		},
		resolve: {
			paymentSystems: PaymentSystemsPageResolver
		},
		skeleton: {
			component: PaymentSystemsPageSkeletonComponent
		}
	}
];
@NgModule({
	imports: [RouterModule.forChild(PAYMENT_SYSTEMS_ROUTES)],
	exports: [RouterModule]
})
export class PaymentSystemsRoutingModule {}
