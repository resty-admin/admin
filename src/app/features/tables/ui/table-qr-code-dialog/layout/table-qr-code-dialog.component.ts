import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import type { TableEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import type { DeepPartial } from "@shared/interfaces";
import { QrCodeComponent } from "@shared/ui/qr-code";

@Component({
	selector: "app-table-qr-code-dialog",
	templateUrl: "./table-qr-code-dialog.component.html",
	styleUrls: ["./table-qr-code-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableQrCodeDialogComponent implements OnInit {
	@ViewChild("qrCodeComponent") qrCodeComponent?: QrCodeComponent;
	data?: DeepPartial<TableEntity>;
	qrData = "";
	constructor(private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.qrData = `http://172.30.8.239:4201/places/f657841f-b153-4775-a060-17648ab51b88/connect-to-table?code=${this.data.code}`;
	}

	downloadQrCode() {
		if (!this.qrCodeComponent) {
			return;
		}

		this.qrCodeComponent.downloadQr(this.data?.name);
	}
}
