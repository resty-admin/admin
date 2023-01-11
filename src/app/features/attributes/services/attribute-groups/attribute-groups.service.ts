import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateAttributeGroupInput, UpdateAttributeGroupInput } from "../../../../../graphql";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateAttrGroupGQL, DeleteAttrGroupGQL, UpdateAttrGroupGQL } from "../../graphql/attribute-groups";
import { AttributeGroupDialogComponent } from "../../ui/attribute-group-dialog/layout/attribute-group-dialog.component";

@Injectable({ providedIn: "root" })
export class AttributeGroupsService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attributesGroup?: any) => this.openUpdateAttributeGroupDialog(attributesGroup).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attributesGroup?: any) => {
				if (!attributesGroup) {
					return;
				}

				this.openDeleteAttributeGroupDialog(attributesGroup).pipe(take(1)).subscribe();
			}
		}
	];

	constructor(
		private readonly _createAttributeGroupGQL: CreateAttrGroupGQL,
		private readonly _updateAttributeGroupGQL: UpdateAttrGroupGQL,
		private readonly _deleteAttributeGroupGQL: DeleteAttrGroupGQL,
		private readonly _dialogService: DialogService
	) {}

	openCreateAttributeGroupDialog(data?: any) {
		return this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup: any) => this.createAttributeGroup(attributeGroup))
		);
	}

	openUpdateAttributeGroupDialog(data: any) {
		return this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup: any) => this.updateAttributeGroup(attributeGroup))
		);
	}

	openDeleteAttributeGroupDialog(attributeGroup: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить группу модификаций?",
				value: attributeGroup
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup) => this.deleteAttributeGroup(attributeGroup.id))
		);
	}

	createAttributeGroup(attrGroup: CreateAttributeGroupInput) {
		return this._createAttributeGroupGQL.mutate({ attrGroup });
	}

	updateAttributeGroup(attrGroup: UpdateAttributeGroupInput) {
		return this._updateAttributeGroupGQL.mutate({ attrGroup });
	}

	deleteAttributeGroup(attrGroupId: string) {
		return this._deleteAttributeGroupGQL.mutate({ attrGroupId });
	}
}
