import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PdfViewerComponent } from "./layout/pdf-viewer.component";

@NgModule({
	declarations: [PdfViewerComponent],
	imports: [CommonModule],
	exports: [PdfViewerComponent]
})
export class PdfViewerModule {}
