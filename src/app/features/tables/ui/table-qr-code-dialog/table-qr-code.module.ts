import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { QrCodeModule } from "@shared/ui/qr-code";
import { TypographyModule } from "@shared/ui/typography";

import { TableQrCodeDialogComponent } from "./layout/table-qr-code-dialog.component";

@NgModule({
	declarations: [TableQrCodeDialogComponent],
	imports: [CommonModule, QrCodeModule, TypographyModule],
	exports: [TableQrCodeDialogComponent]
})
export class TableQrCodeModule {}
