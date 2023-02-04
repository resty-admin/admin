import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { QrCodeModule } from "@shared/ui/qr-code";
import { TypographyModule } from "@shared/ui/typography";

import { TableQrCodeDialogComponent } from "./layout/table-qr-code-dialog.component";

@NgModule({
	declarations: [TableQrCodeDialogComponent],
	imports: [CommonModule, QrCodeModule, TypographyModule, ButtonModule, I18nModule],
	exports: [TableQrCodeDialogComponent]
})
export class TableQrCodeModule {}
