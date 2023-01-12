import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { firstValueFrom, map } from "rxjs";
import { AttributesService } from "src/app/features/attributes/index";

import { AttributeGroupTypeEnum } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { AttributeGroupDialogGQL } from "../graphql/attribute-group-dialog";

@Component({
	selector: "app-attribute-group-dialog",
	templateUrl: "./attribute-group-dialog.component.html",
	styleUrls: ["./attribute-group-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeGroupDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		attributes: [[]],
		maxItemsForPick: 0,
		type: AttributeGroupTypeEnum.Add
	});

	readonly attributeGroupTypes = Object.entries(AttributeGroupTypeEnum).map(([key, value]) => ({
		name: key,
		value
	}));

	private readonly _attributeGroupDialogQuery = this._attributeGroupDialogGQL.watch({ skip: 0, take: 5 });

	readonly attributes$ = this._attributeGroupDialogQuery.valueChanges.pipe(
		map((result) => result.data.attributes.data)
	);

	readonly addTag = (name: string) => firstValueFrom(this._attributesService.openCreateAttributeDialog({ name }));

	constructor(
		private readonly _attributeGroupDialogGQL: AttributeGroupDialogGQL,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _attributesService: AttributesService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(attributeGroup: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...attributeGroup });
	}
}
