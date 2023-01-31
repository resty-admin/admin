import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { ActiveOrderComponent } from "./layout/active-order.component";

@NgModule({
	declarations: [ActiveOrderComponent],
	imports: [CommonModule, ReactiveFormsModule, RouterModule],
	exports: [ActiveOrderComponent]
})
export class ActiveOrderModule {}
