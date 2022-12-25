import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";

import { AllOrdersRoutingModule } from "./all-orders-routing.module";
import { AllOrdersComponent } from "./layout/all-orders.component";

@NgModule({
	declarations: [AllOrdersComponent],
	imports: [CommonModule, AllOrdersRoutingModule, InputModule, IconModule, DatatableModule],
	exports: []
})
export class AllOrdersModule {}
