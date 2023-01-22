import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { I18nModule } from "@shared/modules/i18n";

import { OrderInfoComponent } from "./layout/order-info.component";
import { ORDER_INFO_PROVIDERS } from "./providers";

@NgModule({
	declarations: [OrderInfoComponent],
	imports: [CommonModule, RouterModule, I18nModule],
	providers: ORDER_INFO_PROVIDERS,
	exports: [OrderInfoComponent]
})
export class OrderInfoModule {}
