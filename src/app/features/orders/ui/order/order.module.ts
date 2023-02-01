import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ActiveOrderModule } from "@shared/ui/active-order";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { MoreModule } from "@shared/ui/more";
import { TooltipModule } from "@shared/ui/tooltip";

import { OrderComponent } from "./layout/order.component";

@NgModule({
	declarations: [OrderComponent],
	imports: [
		CommonModule,
		RouterModule,
		I18nModule,
		ImageModule,
		DirectivesModule,
		ButtonModule,
		TooltipModule,
		IconModule,
		ActionsModule,
		MoreModule,
		ActiveOrderModule
	],
	exports: [OrderComponent]
})
export class OrderModule {}
