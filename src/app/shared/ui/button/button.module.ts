import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BUTTON_DIRECTIVES } from "./directives";
import { ButtonComponent } from "./layout/button.component";

@NgModule({
	declarations: [ButtonComponent, ...BUTTON_DIRECTIVES],
	imports: [CommonModule],
	exports: [ButtonComponent, ...BUTTON_DIRECTIVES]
})
export class ButtonModule {}
