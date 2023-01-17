import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { OrderInfoComponent } from "./layout/order-info.component";

@NgModule({
	declarations: [OrderInfoComponent],
	imports: [CommonModule, RouterModule],
	exports: [OrderInfoComponent]
})
export class OrderInfoModule {}
