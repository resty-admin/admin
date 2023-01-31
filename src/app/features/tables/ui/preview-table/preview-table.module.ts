import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ImageModule } from "@shared/ui/image";

import { PreviewTableComponent } from "./layout/preview-table.component";

@NgModule({
	declarations: [PreviewTableComponent],
	imports: [CommonModule, ImageModule],
	exports: [PreviewTableComponent]
})
export class PreviewTableModule {}
