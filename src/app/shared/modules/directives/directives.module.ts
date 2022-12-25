import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DIRECTIVES } from "./directives";

@NgModule({
	declarations: DIRECTIVES,
	imports: [CommonModule],
	exports: DIRECTIVES
})
export class DirectivesModule {}
