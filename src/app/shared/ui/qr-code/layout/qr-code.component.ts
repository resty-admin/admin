import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { QRCodeComponent } from "angularx-qrcode";
import { v4 } from "uuid";

@Component({
	selector: "app-qr-code",
	templateUrl: "./qr-code.component.html",
	styleUrls: ["./qr-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrCodeComponent {
	@ViewChild(QRCodeComponent, { static: true }) qrCodeComponent!: QRCodeComponent;

	@Input() qrdata = "";
	@Input() imageName = "";

	downloadQr(imageName: string) {
		if (!this.qrCodeComponent.context) {
			return;
		}

		const temporaryLink = document.createElement("a");
		temporaryLink.download = `${imageName || v4()}.png`;
		temporaryLink.href = this.qrCodeComponent.context.canvas.toDataURL();

		document.body.append(temporaryLink);
		temporaryLink.click();
		temporaryLink.remove();
	}
}
