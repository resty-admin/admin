import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";

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
			func: (attributesGroup) => this.openUpdateAttributeGroupDialog(attributesGroup).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attributesGroup) => this.openDeleteAttributeGroupDialog(attributesGroup).pipe(take(1)).subscribe()
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

	openCreateAttributeGroupDialog(data: AtLeast<CreateAttributeGroupInput, "place">) {
		return this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup: AttributesGroupEntity) =>
				this.createAttributeGroup({
					name: attributeGroup.name,
					place: data.place,
					maxItemsForPick: attributeGroup.maxItemsForPick,
					type: attributeGroup.type,
					attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
				})
			)
		);
	}

	openUpdateAttributeGroupDialog(data: AtLeast<AttributesGroupEntity, "id">) {
		return this._dialogService.open(AttributeGroupDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup: AttributesGroupEntity) =>
				this.updateAttributeGroup({
					id: attributeGroup.id,
					name: attributeGroup.name,
					maxItemsForPick: attributeGroup.maxItemsForPick,
					attributes: attributeGroup.attributes?.map((attribute) => attribute.id)
				})
			)
		);
	}

	openDeleteAttributeGroupDialog(value: AtLeast<AttributesGroupEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить группу модификаций?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((attributeGroup) => Boolean(attributeGroup)),
			switchMap((attributeGroup) => this.deleteAttributeGroup(attributeGroup.id))
		);
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
