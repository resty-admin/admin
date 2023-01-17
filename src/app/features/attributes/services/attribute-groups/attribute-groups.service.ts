import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { lastValueFrom, Subject, tap } from "rxjs";

import type {
	AttributesGroupEntity,
	CreateAttributeGroupInput,
	UpdateAttributeGroupInput
} from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateAttrGroupGQL, DeleteAttrGroupGQL, UpdateAttrGroupGQL } from "../../graphql/attribute-groups";
import { AttributeGroupDialogComponent } from "../../ui/attribute-group-dialog/layout/attribute-group-dialog.component";

@Injectable({ providedIn: "root" })
export class AttributeGroupsService {
	readonly actions: IAction<AttributesGroupEntity>[] = [
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

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createAttributeGroupGQL: CreateAttrGroupGQL,
		private readonly _updateAttributeGroupGQL: UpdateAttrGroupGQL,
		private readonly _deleteAttributeGroupGQL: DeleteAttrGroupGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	async openCreateAttributeGroupDialog(data: AtLeast<CreateAttributeGroupInput, "place">) {
		const attributeGroup: AttributesGroupEntity = await lastValueFrom(
			this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$
		);

		if (!attributeGroup) {
			return;
		}

		await lastValueFrom(
			this.createAttributeGroup({
				name: attributeGroup.name,
				place: data.place,
				maxItemsForPick: attributeGroup.maxItemsForPick,
				type: attributeGroup.type,
				attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
			})
		);
	}

	async openUpdateAttributeGroupDialog(data: AtLeast<AttributesGroupEntity, "id">) {
		const attributeGroup: AttributesGroupEntity = await lastValueFrom(
			this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$
		);

		if (!attributeGroup) {
			return;
		}

		return lastValueFrom(
			this.updateAttributeGroup({
				id: attributeGroup.id,
				name: attributeGroup.name,
				maxItemsForPick: attributeGroup.maxItemsForPick,
				attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
			})
		);
	}

	async openDeleteAttributeGroupDialog(value: AtLeast<AttributesGroupEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить группу модификаций?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		return lastValueFrom(this.deleteAttributeGroup(value.id));
	}

	createAttributeGroup(attrGroup: CreateAttributeGroupInput) {
		return this._createAttributeGroupGQL.mutate({ attrGroup }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateAttributeGroup(attrGroup: UpdateAttributeGroupInput) {
		return this._updateAttributeGroupGQL.mutate({ attrGroup }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteAttributeGroup(attrGroupId: string) {
		return this._deleteAttributeGroupGQL.mutate({ attrGroupId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
