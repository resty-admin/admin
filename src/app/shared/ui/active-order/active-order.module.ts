import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslocoModule } from "@shared/modules/i18n";

import { ActiveOrderComponent } from "./layout/active-order.component";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslocoModule],
	exports: [ActiveOrderComponent]
})
export class ActiveOrderModule {}
