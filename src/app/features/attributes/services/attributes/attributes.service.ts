import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";

import type { AttributesEntity, CreateAttributeInput, UpdateAttributeInput } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateAttrGQL, DeleteAttrGQL, UpdateAttrGQL } from "../../graphql/attributes";
import { AttributeDialogComponent } from "../../ui/attribute-dialog/layout/attribute-dialog.component";

@Injectable({ providedIn: "root" })
export class AttributesService {
	readonly actions: IAction<AttributesEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attribute?) => this.openUpdateAttributeDialog(attribute).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attribute?) => this.openDeleteAttributeDialog(attribute).pipe(take(1)).subscribe()
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createAttributeGQL: CreateAttrGQL,
		private readonly _updateAttributeGQL: UpdateAttrGQL,
		private readonly _deleteAttributeGQL: DeleteAttrGQL,
		private readonly _dialogService: DialogService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateAttributeDialog(data?: Partial<CreateAttributeInput>) {
		return this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute: AttributesEntity) =>
				this.createAttribute({ name: attribute.name, price: attribute.price! })
			)
		);
	}

	openUpdateAttributeDialog(data: AtLeast<AttributesEntity, "id">) {
		return this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute: AttributesEntity) =>
				this.updateAttribute({ id: attribute.id, name: attribute.name, price: attribute.price })
			)
		);
	}

	openDeleteAttributeDialog(value: AtLeast<AttributesEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить модификацию?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute) => this.deleteAttribute(attribute.id))
		);
	}

	createAttribute(attr: CreateAttributeInput) {
		return this._createAttributeGQL.mutate({ attr }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateAttribute(attr: UpdateAttributeInput) {
		return this._updateAttributeGQL.mutate({ attr }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteAttribute(attrId: string) {
		return this._deleteAttributeGQL.mutate({ attrId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
