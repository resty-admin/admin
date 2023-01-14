import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

interface IConfirmationData {
	title: string;
	value: {
		label?: string;
		name?: string;
	};
}

@Component({
	selector: "app-confirmation-dialog",
	templateUrl: "./confirmation-dialog.component.html",
	styleUrls: ["./confirmation-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent<T extends IConfirmationData> implements OnInit {
	data!: IConfirmationData;
	constructor(private readonly _dialogRef: DialogRef<T>, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.data = this._dialogRef.data;
	}

	closeDialog(data: T["value"] | undefined) {
		this._dialogRef.close(data);
	}
}
