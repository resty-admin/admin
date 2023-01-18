import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import type { AttributesEntity } from "../../../../../../graphql";
import type { DeepPartial } from "../../../../../shared/interfaces";
import type { IAttributeForm } from "../interfaces";

@Component({
	selector: "app-attribute-dialog",
	templateUrl: "./attribute-dialog.component.html",
	styleUrls: ["./attribute-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<IAttributeForm>({
		name: "",
		price: 0
	});

	data?: DeepPartial<AttributesEntity>;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		if (!this._dialogRef.data) {
			return;
		}

		this.data = this._dialogRef.data;
		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(attribute?: IAttributeForm) {
		if (!attribute) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...attribute });
	}
}
