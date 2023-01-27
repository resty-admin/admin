import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { AttributesEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";

import { ATTRIBUTE_DIALOG } from "../constants";
import type { IAttributeForm } from "../interfaces";

@Component({
	selector: "app-attribute-dialog",
	templateUrl: "./attribute-dialog.component.html",
	styleUrls: ["./attribute-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeDialogComponent implements OnInit {
	readonly attributeDialog = ATTRIBUTE_DIALOG;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group<IAttributeForm>({
		name: "",
		price: 0
	});

	data?: AttributesEntity;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(attribute?: IAttributeForm) {
		if (!attribute) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...attribute });
	}
}
