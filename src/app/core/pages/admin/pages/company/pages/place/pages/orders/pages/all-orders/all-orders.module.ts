import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";

import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { ButtonModule } from "../../../../../../../../../../../shared/ui/button";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { AllOrdersRoutingModule } from "./all-orders-routing.module";
import { AllOrdersComponent } from "./layout/all-orders.component";

@NgModule({
	declarations: [AllOrdersComponent],
	imports: [
		CommonModule,
		AllOrdersRoutingModule,
		InputModule,
		IconModule,
		DatatableModule,
		TooltipModule,
		ButtonModule,
		ActionsModule,
		TranslocoModule
	]
})
export class AllOrdersModule {}
