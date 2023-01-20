import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { lastValueFrom, map } from "rxjs";
import { AttributeGroupsService, AttributesService } from "src/app/features/attributes";
import { PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import type { AttributesEntity, AttributesGroupEntity } from "../../../../../../../../../../../../../graphql";
import { ActionsService } from "../../../../../../../../../../../../features/app";
import { AttributeDialogComponent } from "../../../../../../../../../../../../features/attributes/ui/attribute-dialog/layout/attribute-dialog.component";
import { AttributeGroupDialogComponent } from "../../../../../../../../../../../../features/attributes/ui/attribute-group-dialog/layout/attribute-group-dialog.component";
import type { AtLeast } from "../../../../../../../../../../../../shared/interfaces";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../../../shared/ui/toastr";
import { ATTRIBUTES_PAGE_I18N } from "../constants";
import { AttributesPageGQL } from "../graphql/attributes-page";

@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent implements OnInit, OnDestroy {
	readonly attributesPageI18n = ATTRIBUTES_PAGE_I18N;
	private readonly _attributesPageQuery = this._attributesPageGQL.watch();
	readonly attributeGroups$ = this._attributesPageQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	readonly attributesGroupActions: IAction<AttributesGroupEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attributesGroup) => this.openUpdateAttributeGroupDialog(attributesGroup)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attributesGroup) => this.openDeleteAttributeGroupDialog(attributesGroup)
		}
	];

	readonly attributeActions: IAction<AttributesEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attribute?) => this.openUpdateAttributeDialog(attribute)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attribute?) => this.openDeleteAttributeDialog(attribute)
		}
	];

	constructor(
		private readonly _attributesPageGQL: AttributesPageGQL,
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _attributesService: AttributesService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	trackByFn(index: number) {
		return index;
	}

	async ngOnInit() {
		const placeId = this._routerService.getParams(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		this._actionsService.setAction({
			label: "Добавить модификации",
			func: () => this.openCreateAttributeDialog()
		});

		await this._attributesPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}

	async openCreateAttributeGroupDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		if (!place) {
			return;
		}

		const attributeGroup: AttributesGroupEntity | undefined = await lastValueFrom(
			this._dialogService.open(AttributeGroupDialogComponent).afterClosed$
		);

		if (!attributeGroup) {
			return;
		}

		await lastValueFrom(
			this._attributeGroupsService
				.createAttributeGroup({
					name: attributeGroup.name,
					place,
					maxItemsForPick: attributeGroup.maxItemsForPick,
					type: attributeGroup.type,
					attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
				})
				.pipe(this._toastrService.observe("Группа модификаций"))
		);

		await this._attributesPageQuery.refetch();
	}

	async openUpdateAttributeGroupDialog(data: AtLeast<AttributesGroupEntity, "id">) {
		const attributeGroup: AttributesGroupEntity | undefined = await lastValueFrom(
			this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$
		);

		if (!attributeGroup) {
			return;
		}

		await lastValueFrom(
			this._attributeGroupsService
				.updateAttributeGroup({
					id: attributeGroup.id,
					name: attributeGroup.name,
					maxItemsForPick: attributeGroup.maxItemsForPick,
					attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
				})
				.pipe(this._toastrService.observe("Группа модификаций"))
		);

		await this._attributesPageQuery.refetch();
	}

	async openDeleteAttributeGroupDialog(value: AtLeast<AttributesGroupEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить группу модификаций?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._attributeGroupsService
				.deleteAttributeGroup(value.id)
				.pipe(this._toastrService.observe("Группа модификаций"))
		);

		await this._attributesPageQuery.refetch();
	}

	async openCreateAttributeDialog(data?: AtLeast<AttributesEntity, "attributesGroup">) {
		const attribute: AttributesEntity | undefined = await lastValueFrom(
			this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$
		);

		if (!attribute) {
			return;
		}

		await lastValueFrom(
			this._attributesService
				.createAttribute({
					name: attribute.name,
					price: attribute.price,
					attributesGroup: (attribute.attributesGroup || []).map((attributeGroup) => attributeGroup.id)
				})
				.pipe(this._toastrService.observe("Модификации"))
		);

		await this._attributesPageQuery.refetch();
	}

	async openUpdateAttributeDialog(data: AtLeast<AttributesEntity, "id">) {
		const attribute: AttributesEntity | undefined = await lastValueFrom(
			this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$
		);

		if (!attribute) {
			return;
		}

		await lastValueFrom(
			this._attributesService
				.updateAttribute({
					id: attribute.id,
					name: attribute.name,
					price: attribute.price,
					attributesGroup: (attribute.attributesGroup || []).map((attributeGroup) => attributeGroup.id)
				})
				.pipe(this._toastrService.observe("Модификации"))
		);

		await this._attributesPageQuery.refetch();
	}

	async openDeleteAttributeDialog(value: AtLeast<AttributesEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить модификацию?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._attributesService.deleteAttribute(value.id).pipe(this._toastrService.observe("Модификации"))
		);

		await this._attributesPageQuery.refetch();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
