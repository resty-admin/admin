import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { TableEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import type { DeepPartial } from "@shared/interfaces";

@Component({
	selector: "app-table-qr-code-dialog",
	templateUrl: "./table-qr-code-dialog.component.html",
	styleUrls: ["./table-qr-code-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableQrCodeDialogComponent implements OnInit {
	data?: DeepPartial<TableEntity>;
	qrData = "";
	constructor(private readonly _dialogRef: DialogRef) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.qrData = `http://192.168.68.102:4201/places/f657841f-b153-4775-a060-17648ab51b88/connect-to-table?code=${this.data.code}`;
	}
}
