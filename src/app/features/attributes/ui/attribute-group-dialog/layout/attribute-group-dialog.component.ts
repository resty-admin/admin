import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
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
import { filter, from, lastValueFrom, map, switchMap, take } from "rxjs";

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
		name: ["", Validators.required],
		attributes: [null, Validators.required],
		maxItemsForPick: [0, [Validators.required, Validators.pattern(/^[1-9]$/)]],
		type: [AttributeGroupTypeEnum.Add, Validators.required]
	});

	readonly attributeGroupTypes = Object.values(AttributeGroupTypeEnum).map((value) => ({
		name: value,
		value
	}));

	private readonly _attributeGroupDialogQuery = this._attributeGroupDialogGQL.watch();

	readonly attributes$ = this._attributeGroupDialogQuery.valueChanges.pipe(
		map((result) => result.data.attributes.data)
	);

	readonly addTag = (name: string) => lastValueFrom(this.openCreateAttributeDialog({ name }).pipe(take(1)));

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
			filtersArgs: [{ key: "place.id", operator: "=", value: place }]
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
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute) =>
				this._attributesService
					.createAttribute({
						place: this._routerService.getParams(PLACE_ID.slice(1)),
						name: attribute.name,
						price: attribute.price,
						attributesGroup: (attribute.attributesGroup || []).map((attributeGroup: any) => attributeGroup.id)
					})
					.pipe(
						switchMap((result) =>
							from(this._attributeGroupDialogQuery.refetch()).pipe(map(() => result.data?.createAttr.id))
						),
						this._toastrService.observe(this._i18nService.translate("ATTRIBUTE_GROUPS.CREATE"))
					)
			)
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
