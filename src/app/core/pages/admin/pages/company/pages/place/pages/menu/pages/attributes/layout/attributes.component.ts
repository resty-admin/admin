import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import {
	AttributeDialogComponent,
	AttributeGroupDialogComponent,
	AttributeGroupsService,
	AttributesService
} from "@features/attributes";
import type { AttributesEntity, AttributesGroupEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { DeepAtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, map, switchMap, take } from "rxjs";

import { AttributesPageGQL } from "../graphql";

@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent implements OnInit, OnDestroy {
	private readonly _attributesPageQuery = this._attributesPageGQL.watch();
	readonly attributeGroups$ = this._attributesPageQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _routerService: RouterService,
		private readonly _actionsService: ActionsService,
		private readonly _attributesPageGQL: AttributesPageGQL,
		private readonly _attributesService: AttributesService,
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		this._actionsService.setAction({
			label: "Добавить модификации",
			func: () => this.openCreateAttributeGroupDialog()
		});

		await this._attributesPageQuery.setVariables({
			filtersArgs: [{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) }]
		});
	}

	openCreateAttributeGroupDialog() {
		this._dialogService
			.open(AttributeGroupDialogComponent)
			.afterClosed$.pipe(
				filter((attributeGroup) => Boolean(attributeGroup)),
				switchMap((attributeGroup) =>
					this._attributeGroupsService
						.createAttributeGroup({
							name: attributeGroup.name,
							place: this._routerService.getParams(PLACE_ID.slice(1)),
							maxItemsForPick: attributeGroup.maxItemsForPick,
							type: attributeGroup.type,
							attributes: attributeGroup.attributes?.map((attribute: any) => attribute.id)
						})
						.pipe(
							switchMap(() => from(this._attributesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("ATTRIBUTE_GROUPS.CREATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateAttributeGroupDialog(data: DeepAtLeast<AttributesGroupEntity, "id">) {
		this._dialogService
			.open(AttributeGroupDialogComponent, { data })
			.afterClosed$.pipe(
				filter((attributeGroup) => Boolean(attributeGroup)),
				switchMap((attributeGroup) =>
					this._attributeGroupsService
						.updateAttributeGroup({
							id: attributeGroup.id,
							name: attributeGroup.name,
							maxItemsForPick: attributeGroup.maxItemsForPick,
							attributes: attributeGroup.attributes?.map((attribute: any) => attribute.id)
						})
						.pipe(
							switchMap(() => from(this._attributesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("ATTRIBUTE_GROUPS.UPDATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteAttributeGroupDialog(value: DeepAtLeast<AttributesGroupEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("ATTRIBUTE_GROUPS.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._attributeGroupsService.deleteAttributeGroup(value.id).pipe(
						switchMap(() => from(this._attributesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("ATTRIBUTE_GROUPS.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openCreateAttributeDialog(data?: DeepAtLeast<AttributesEntity, "attributesGroup">) {
		this._dialogService
			.open(AttributeDialogComponent, { data })
			.afterClosed$.pipe(
				filter((attribute) => Boolean(attribute)),
				switchMap((attribute) =>
					this._attributesService
						.createAttribute({
							name: attribute.name,
							price: attribute.price,
							attributesGroup: (attribute.attributesGroup || []).map((attributeGroup: any) => attributeGroup.id)
						})
						.pipe(
							switchMap(() => from(this._attributesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("ATTRIBUTES.CREATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openUpdateAttributeDialog(data: DeepAtLeast<AttributesEntity, "id">) {
		this._dialogService
			.open(AttributeDialogComponent, { data })
			.afterClosed$.pipe(
				filter((attribute) => Boolean(attribute)),
				switchMap((attribute) =>
					this._attributesService
						.updateAttribute({
							id: attribute.id,
							name: attribute.name,
							price: attribute.price,
							attributesGroup: (attribute.attributesGroup || []).map((attributeGroup: any) => attributeGroup.id)
						})
						.pipe(
							switchMap(() => from(this._attributesPageQuery.refetch())),
							this._toastrService.observe(this._i18nService.translate("ATTRIBUTES.UPDATE"))
						)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteAttributeDialog(value: DeepAtLeast<AttributesEntity, "id">) {
		return this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("ATTRIBUTES.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((isConfirmed) => Boolean(isConfirmed)),
				switchMap(() =>
					this._attributesService.deleteAttribute(value.id).pipe(
						switchMap(() => from(this._attributesPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("ATTRIBUTES.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
