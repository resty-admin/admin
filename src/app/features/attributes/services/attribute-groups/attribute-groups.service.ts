import { Inject } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAttributeGroup } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateAttributeGroupInput, UpdateAttributeGroupInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { AttributeGroupDialogComponent } from "../../components";
import {
	AttributeGroupsGQL,
	CreateAttrGroupGQL,
	DeleteAttrGroupGQL,
	UpdateAttrGroupGQL
} from "../../graphql/attribute-groups";

@Inject({ providedIn: "root" })
export class AttributeGroupsService {
	readonly attributeGroups$ = this._attributeGroupsGQL
		.watch()
		.valueChanges.pipe(map((result) => result.data.attributeGroups.data));

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attributesGroup?: any) => this.openCreateOrUpdateAttributeGroupDialog(attributesGroup)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attributesGroup?: any) => {
				if (!attributesGroup) {
					return;
				}

				this.openDeleteAttributeGroupDialog(attributesGroup);
			}
		}
	];

	constructor(
		private readonly _attributeGroupsGQL: AttributeGroupsGQL,
		private readonly _createAttributeGroupGQL: CreateAttrGroupGQL,
		private readonly _updateAttributeGroupGQL: UpdateAttrGroupGQL,
		private readonly _deleteAttributeGroupGQL: DeleteAttrGroupGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._attributeGroupsGQL.watch().refetch();
	}

	openCreateOrUpdateAttributeGroupDialog(attributeGroup?: any) {
		return this._dialogService
			.openFormDialog(AttributeGroupDialogComponent, { data: { attributeGroup } })
			.pipe(
				switchMap((attributeGroup: any) =>
					attributeGroup.id ? this.updateAttributeGroup(attributeGroup) : this.createAttributeGroup(attributeGroup)
				)
			);
	}

	openDeleteAttributeGroupDialog(attributeGroup: IAttributeGroup) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить группу модификаций?",
					value: attributeGroup
				}
			})
			.pipe(switchMap((attributeGroup) => this._deleteAttributeGroupGQL.mutate(attributeGroup.id)));
	}

	createAttributeGroup(attrGroup: CreateAttributeGroupInput) {
		return this._createAttributeGroupGQL.mutate({ attrGroup }).pipe(
			take(1),
			this._toastrService.observe("Группа Модификаций"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateAttributeGroup(attrGroup: UpdateAttributeGroupInput) {
		return this._updateAttributeGroupGQL.mutate({ attrGroup }).pipe(
			take(1),
			this._toastrService.observe("Группа Модификаций"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteAttributeGroup(attrGroupId: string) {
		return this._deleteAttributeGroupGQL.mutate({ attrGroupId }).pipe(
			take(1),
			this._toastrService.observe("Группа Модификаций"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
