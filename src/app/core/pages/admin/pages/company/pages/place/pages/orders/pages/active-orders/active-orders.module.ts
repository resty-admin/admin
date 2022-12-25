import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";

import { ActiveOrdersRoutingModule } from "./active-orders-routing.module";
import { ActiveOrdersComponent } from "./layout/active-orders.component";

@NgModule({
	declarations: [ActiveOrdersComponent],
	imports: [CommonModule, ActiveOrdersRoutingModule, InputModule, IconModule, ImageModule],
	exports: []
})
export class ActiveOrdersModule {}
