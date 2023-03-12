import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PagerComponent } from "./layout/pager.component";

@NgModule({
	declarations: [PagerComponent],
	imports: [CommonModule],
	exports: [PagerComponent]
})
export class PagerModule {}
