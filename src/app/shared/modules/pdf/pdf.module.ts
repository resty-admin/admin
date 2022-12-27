import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PdfViewerModule } from "ng2-pdf-viewer";

import { PdfComponent } from "./layout/pdf.component";

@NgModule({
	declarations: [PdfComponent],
	imports: [CommonModule, PdfViewerModule],
	exports: [PdfComponent]
})
export class PdfModule {}
