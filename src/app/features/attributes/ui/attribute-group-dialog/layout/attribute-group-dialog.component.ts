import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AttributesService } from "@features/attributes";
import type { AttributesEntity, AttributesGroupEntity } from "@graphql";
import { AttributeGroupTypeEnum } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { PLACE_ID } from "@shared/constants";
import { buildForm } from "@shared/functions";
import type { DeepPartial } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, switchMap, take } from "rxjs";

import { AttributeDialogComponent } from "../../attribute-dialog/layout/attribute-dialog.component";
import { AttributeGroupDialogGQL } from "../graphql";
import type { IAttributeGroupForm } from "../interfaces/attribute-group-form.interface";

@Component({
	selector: "app-attribute-group-dialog",
	templateUrl: "./attribute-group-dialog.component.html",
	styleUrls: ["./attribute-group-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributeGroupDialogComponent implements OnInit {
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
		private readonly _attributesService: AttributesService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		await this._attributeGroupDialogQuery.setVariables({
			filtersArgs: [{ key: "attributesGroup.place.id", operator: "=", value: place }]
		});

		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue({
			...this.data,
			attributes: this.data.attributes?.map((attribute) => attribute.id)
		});
	}

	openCreateAttributeDialog(data?: DeepPartial<AttributesEntity>) {
		return this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute) =>
				this._attributesService
					.createAttribute({
						name: attribute.name,
						price: attribute.price,
						attributesGroup: (attribute.attributesGroup || []).map((attributeGroup: any) => attributeGroup.id)
					})
					.pipe(this._toastrService.observe(this._i18nService.translate("CREATE_ATTRIBUTE")))
			),
			take(1)
		);
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
