import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";

import { getScopeProvider } from "../../../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { ButtonModule } from "../../../../../../../../../../../shared/ui/button";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { ActiveOrdersRoutingModule } from "./active-orders-routing.module";
import { ActiveOrdersComponent } from "./layout/active-orders.component";

@NgModule({
	declarations: [ActiveOrdersComponent],
	imports: [
		CommonModule,
		ActiveOrdersRoutingModule,
		InputModule,
		IconModule,
		ImageModule,
		ButtonModule,
		ActionsModule,
		TooltipModule,
		TranslocoModule
	],
	providers: [getScopeProvider("active-orders", (lang) => import(`./i18n/${lang}.json`))]
})
export class ActiveOrdersModule {}
