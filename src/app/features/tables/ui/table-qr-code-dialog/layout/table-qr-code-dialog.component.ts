import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";
import { environment } from "@env/environment";
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
	data?: DeepPartial<TableEntity> & { placeId: string };
	qrData = "";
	constructor(private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data || !this.data.placeId) {
			return;
		}

		this.qrData = `${environment.clientUrl}/places/${this.data.placeId}/connect-to-table?code=${this.data.code}`;
	}

	downloadQrCode() {
		if (!this.qrCodeComponent) {
			return;
		}

		this.qrCodeComponent.downloadQr(this.data?.name);
	}
}
