import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconModule } from "../icon";
import { ActionsComponent } from "./layout/actions.component";

@NgModule({
	imports: [CommonModule, IconModule],
	declarations: [ActionsComponent],
	exports: [ActionsComponent]
})
export class ActionsModule {}
