import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { I18nModule } from "@shared/modules/i18n";

import { OrderInfoComponent } from "./layout/order-info.component";

@NgModule({
	declarations: [OrderInfoComponent],
	imports: [CommonModule, RouterModule, I18nModule],
	exports: [OrderInfoComponent]
})
export class OrderInfoModule {}
