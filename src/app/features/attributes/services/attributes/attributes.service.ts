import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateAttributeInput, UpdateAttributeInput } from "../../../../../graphql";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { CreateAttrGQL, DeleteAttrGQL, UpdateAttrGQL } from "../../graphql/attributes";
import { AttributeDialogComponent } from "../../ui/attribute-dialog/layout/attribute-dialog.component";

@Injectable({ providedIn: "root" })
export class AttributesService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attribute?: any) => this.openUpdateAttributeDialog(attribute).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attribute?: any) => {
				if (!attribute) {
					return;
				}

				this.openDeleteAttributeDialog(attribute).pipe(take(1)).subscribe();
			}
		}
	];

	constructor(
		private readonly _createAttributeGQL: CreateAttrGQL,
		private readonly _updateAttributeGQL: UpdateAttrGQL,
		private readonly _deleteAttributeGQL: DeleteAttrGQL,
		private readonly _dialogService: DialogService
	) {}

	openCreateAttributeDialog(data?: any) {
		return this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute: any) => this.createAttribute(attribute))
		);
	}

	openUpdateAttributeDialog(data: any) {
		return this._dialogService.open(AttributeDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute: any) => this.updateAttribute(attribute))
		);
	}

	openDeleteAttributeDialog(attribute: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить модификацию?",
				value: attribute
			}
		};
		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((attribute) => Boolean(attribute)),
			switchMap((attribute) => this.deleteAttribute(attribute.id))
		);
	}

	createAttribute(attr: CreateAttributeInput) {
		return this._createAttributeGQL.mutate({ attr });
	}

	updateAttribute(attr: UpdateAttributeInput) {
		return this._updateAttributeGQL.mutate({ attr });
	}

	deleteAttribute(attrId: string) {
		return this._deleteAttributeGQL.mutate({ attrId });
	}
}
