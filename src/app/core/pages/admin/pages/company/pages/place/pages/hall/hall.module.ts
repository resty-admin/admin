import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { HallRoutingModule } from "./hall-routing.module";
import { HallComponent } from "./layout/hall.component";

@NgModule({
	declarations: [HallComponent],
	imports: [CommonModule, HallRoutingModule],
	exports: [HallComponent]
})
export class HallModule {}
