import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { DialogRef } from "@ngneat/dialog";
import { lastValueFrom, map } from "rxjs";
import { AttributesService } from "src/app/features/attributes/index";

import type { AttributesEntity, AttributesGroupEntity } from "../../../../../../graphql";
import { AttributeGroupTypeEnum } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { buildForm } from "../../../../../shared/functions";
import type { DeepPartial } from "../../../../../shared/interfaces";
import { DialogService } from "../../../../../shared/ui/dialog";
import { AttributeDialogComponent } from "../../attribute-dialog/layout/attribute-dialog.component";
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
	readonly formGroup = buildForm<IAttributeGroupForm>({
		name: [""],
		attributes: [null],
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

	readonly addTag = (name: string) => this.openCreateAttributeDialog({ name });

	data?: AttributesGroupEntity;

	constructor(
		private readonly _attributeGroupDialogGQL: AttributeGroupDialogGQL,
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _attributesService: AttributesService,
		private readonly _dialogService: DialogService
	) {}

	async openCreateAttributeDialog(data?: DeepPartial<AttributesEntity>) {
		const attribute: AttributesEntity | undefined = await lastValueFrom(
			this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$
		);

		if (!attribute) {
			return;
		}

		const result = await lastValueFrom(
			this._attributesService.createAttribute({
				name: attribute.name,
				price: attribute.price,
				attributesGroup: (attribute.attributesGroup || []).map((attributeGroup) => attributeGroup.id)
			})
		);

		return result.data?.createAttr;
	}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue({
			...this.data,
			attributes: this.data.attributes?.map((attribute) => attribute.id)
		});
	}

	closeDialog(attributeGroup?: DeepPartial<IAttributeGroupForm>) {
		if (!attributeGroup) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({
			...this.data,
			...attributeGroup,
			attributes: attributeGroup.attributes?.map((id) => ({ id }))
		});
	}
}
