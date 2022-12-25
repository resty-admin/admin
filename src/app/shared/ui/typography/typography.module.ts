import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TYPOGRAPHY_DIRECTIVES } from "./directives";
import { TypographyComponent } from "./layout/typography.component";

@NgModule({
	declarations: [TypographyComponent, ...TYPOGRAPHY_DIRECTIVES],
	imports: [CommonModule],
	exports: [TypographyComponent, ...TYPOGRAPHY_DIRECTIVES]
})
export class TypographyModule {}
