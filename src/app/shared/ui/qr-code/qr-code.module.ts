import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { QRCodeModule } from "angularx-qrcode";

import { IconModule } from "../icon";
import { QrCodeComponent } from "./layout/qr-code.component";

@NgModule({
	declarations: [QrCodeComponent],
	imports: [CommonModule, QRCodeModule, IconModule],
	exports: [QrCodeComponent]
})
export class QrCodeModule {}
