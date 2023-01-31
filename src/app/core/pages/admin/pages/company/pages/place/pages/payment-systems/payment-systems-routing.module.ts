import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PaymentSystemsSkeletonComponent } from "./components";
import { PAYMENT_SYSTEMS_PAGE } from "./constants";
import { PaymentSystemsComponent } from "./layout/payment-systems.component";
import { PaymentSystemsResolver } from "./resolvers";

export const PAYMENT_SYSTEMS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PaymentSystemsComponent,
		data: {
			animation: PAYMENT_SYSTEMS_PAGE
		},
		resolve: {
			paymentSystems: PaymentSystemsResolver
		},
		skeleton: {
			component: PaymentSystemsSkeletonComponent
		}
	}
];
@NgModule({
	imports: [RouterModule.forChild(PAYMENT_SYSTEMS_ROUTES)],
	exports: [RouterModule]
})
export class PaymentSystemsRoutingModule {}
