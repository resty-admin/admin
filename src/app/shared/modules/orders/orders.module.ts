import { NgModule } from "@angular/core";

import { ORDERS_COMPONENTS } from "./components";

@NgModule({
	declarations: ORDERS_COMPONENTS,
	exports: ORDERS_COMPONENTS
})
export class OrdersModule {}
