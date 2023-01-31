import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ListComponent } from "./layout/list.component";

@NgModule({
	declarations: [ListComponent],
	imports: [CommonModule, RouterModule],
	exports: [ListComponent]
})
export class ListModule {}
