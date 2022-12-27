import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { filter, switchMap, take } from "rxjs";
import type { IAttribute, IAttributesGroup } from "src/app/shared/interfaces";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PLACE_ID } from "../../../../../../../../../../../../shared/constants";
import {
	AttributesGroupsService,
	AttributesService
} from "../../../../../../../../../../../../shared/modules/attributes";
import { RouterService } from "../../../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../../../shared/ui/confirmation-dialog";
import { AttributeDialogComponent, AttributesGroupDialogComponent } from "../components";

@UntilDestroy()
@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent {
	readonly attributesGroups$ = this._attributesGroupsService.attributesGroups$;
	readonly attributesGroupActions: IAction<IAttributesGroup>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attributesGroup?: IAttributesGroup) => this.openAttributeGroupDialog(attributesGroup)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attributesGroup?: IAttributesGroup) => {
				if (!attributesGroup) {
					return;
				}

				this.openDeleteAttributeGroupDialog(attributesGroup);
			}
		}
	];

	readonly attributeActions: IAction<IAttribute>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attribute?: IAttribute) => this.openAttributeDialog(attribute)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attribute?: IAttribute) => {
				if (!attribute) {
					return;
				}

				this.openDeleteAttributeDialog(attribute);
			}
		}
	];

	constructor(
		private readonly _attributesService: AttributesService,
		private readonly _attributesGroupsService: AttributesGroupsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService
	) {}

	openDeleteAttributeDialog(attribute: Partial<IAttribute>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить модификаций?",
					value: attribute
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((attribute) => Boolean(attribute)),
				switchMap((attribute) => this._attributesService.deleteAttribute(attribute.id))
			)
			.subscribe();
	}

	openDeleteAttributeGroupDialog(attributeGroup: Partial<IAttributesGroup>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить группу модификаций?",
					value: attributeGroup
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((attributeGroup) => Boolean(attributeGroup)),
				switchMap((attributeGroup) => this._attributesGroupsService.deleteAttributesGroup(attributeGroup.id))
			)
			.subscribe();
	}

	openAttributeDialog(attribute?: Partial<IAttribute>) {
		this._dialogService
			.open(AttributeDialogComponent, { data: attribute })
			.afterClosed$.pipe(
				take(1),
				filter((attribute) => Boolean(attribute)),
				switchMap((attribute: Partial<IAttributesGroup>) =>
					attribute.id
						? this._attributesService
								.updateAttribute(attribute.id, attribute)
								.pipe(take(1), this._toastrService.observe("Модификация"))
						: this._attributesService
								.createAttribute({
									...attribute,
									place: this._routerService.getParams(PLACE_ID.slice(1))
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Модификация"))
				)
			)
			.subscribe();
	}

	openAttributeGroupDialog(attributeGroup?: Partial<IAttributesGroup>) {
		this._dialogService
			.open(AttributesGroupDialogComponent, { data: attributeGroup })
			.afterClosed$.pipe(
				take(1),
				filter((attributeGroup) => Boolean(attributeGroup)),
				switchMap((attributeGroup: Partial<IAttributesGroup>) =>
					attributeGroup.id
						? this._attributesGroupsService
								.updateAttributesGroup(attributeGroup.id, attributeGroup)
								.pipe(take(1), this._toastrService.observe("Группа модификаций"))
						: this._attributesGroupsService
								.createAttributesGroup({
									...attributeGroup,
									place: this._routerService.getParams(PLACE_ID.slice(1))
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Группа модификаций"))
				)
			)
			.subscribe();
	}
}
