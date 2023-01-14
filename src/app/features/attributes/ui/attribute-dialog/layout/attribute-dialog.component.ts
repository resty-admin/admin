import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

@Component({
	selector: "app-attribute-dialog",
	templateUrl: "./attribute-dialog.component.html",
	styleUrls: ["./attribute-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		price: 0
	});

	data!: any;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		if (this._dialogRef.data) {
			this.data = this._dialogRef.data;
			this.formGroup.patchValue(this._dialogRef.data);
		}
	}

	closeDialog(attribute: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...attribute });
	}
}
