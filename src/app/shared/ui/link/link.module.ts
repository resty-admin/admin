import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LINK_DIRECTIVES } from "./directives";
import { LinkComponent } from "./layout/link.component";

@NgModule({
	declarations: [LinkComponent, ...LINK_DIRECTIVES],
	imports: [CommonModule, RouterModule],
	exports: [LinkComponent, ...LINK_DIRECTIVES]
})
export class LinkModule {}
