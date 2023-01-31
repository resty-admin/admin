import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslocoModule } from "@shared/modules/i18n";

import { ActiveOrderComponent } from "./layout/active-order.component";
import { ACTIVE_ORDER_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslocoModule],
	providers: ACTIVE_ORDER_PROVIDERS,
	exports: [ActiveOrderComponent]
})
export class ActiveOrderModule {}
