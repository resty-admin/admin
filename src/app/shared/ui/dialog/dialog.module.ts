import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DialogComponent } from "./layout/dialog.component";

@NgModule({
	declarations: [DialogComponent],
	imports: [CommonModule],
	exports: [DialogComponent]
})
export class DialogModule {}
