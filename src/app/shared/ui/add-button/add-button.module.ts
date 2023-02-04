import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";

import { AddButtonComponent } from "./layout/add-button.component";

@NgModule({
	declarations: [AddButtonComponent],
	imports: [CommonModule, ButtonModule, IconModule],
	exports: [AddButtonComponent]
})
export class AddButtonModule {}
