import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { map } from "rxjs";
import { AttributesService } from "src/app/features/attributes/index";

import type { AttributesGroupEntity } from "../../../../../../graphql";
import { AttributeGroupTypeEnum } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { buildForm } from "../../../../../shared/functions";
import type { DeepPartial } from "../../../../../shared/interfaces";
import { AttributeGroupDialogGQL } from "../graphql/attribute-group-dialog";
import type { IAttributeGroupForm } from "../interfaces/attribute-group-form.interface";

@Component({
	selector: "app-attribute-group-dialog",
	templateUrl: "./attribute-group-dialog.component.html",
	styleUrls: ["./attribute-group-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeGroupDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = buildForm({
		name: [""],
		attributes: [[]],
		maxItemsForPick: [0],
		type: [AttributeGroupTypeEnum.Add]
	});

	readonly attributeGroupTypes = Object.entries(AttributeGroupTypeEnum).map(([key, value]) => ({
		name: key,
		value
	}));

	private readonly _attributeGroupDialogQuery = this._attributeGroupDialogGQL.watch({ skip: 0, take: 5 });

	readonly attributes$ = this._attributeGroupDialogQuery.valueChanges.pipe(
		map((result) => result.data.attributes.data)
	);

	readonly addTag = (name: string) => this._attributesService.openCreateAttributeDialog({ name });

	data?: DeepPartial<AttributesGroupEntity>;

	constructor(
		private readonly _attributeGroupDialogGQL: AttributeGroupDialogGQL,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _attributesService: AttributesService
	) {}

	ngOnInit() {
		if (!this._dialogRef.data) {
			return;
		}

		this.data = this._dialogRef.data;
		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(attributeGroup: Partial<IAttributeGroupForm> | undefined) {
		if (!attributeGroup) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...attributeGroup });
	}
}
