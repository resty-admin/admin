import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateAttributeInput, UpdateAttributeInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { AttributeDialogComponent } from "../../components";
import { AttributesGQL, CreateAttrGQL, DeleteAttrGQL, UpdateAttrGQL } from "../../graphql/attributes";

@Injectable({ providedIn: "root" })
export class AttributesService {
	private readonly _attributesQuery = this._attributesGQL.watch({ skip: 0, take: 10 });

	readonly attributes$ = this._attributesQuery.valueChanges.pipe(map((result) => result.data.attributes.data));

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attribute?: any) => this.openCreateOrUpdateAttributeDialog(attribute).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (attribute?: any) => {
				if (!attribute) {
					return;
				}

				this.openDeleteAttributeDialog(attribute).subscribe();
			}
		}
	];

	constructor(
		private readonly _attributesGQL: AttributesGQL,
		private readonly _createAttributeGQL: CreateAttrGQL,
		private readonly _updateAttributeGQL: UpdateAttrGQL,
		private readonly _deleteAttributeGQL: DeleteAttrGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openCreateOrUpdateAttributeDialog(data?: any) {
		return this._dialogService.openFormDialog(AttributeDialogComponent, { data }).pipe(
			switchMap((attribute: any) =>
				attribute.id
					? this.updateAttribute({
							id: attribute.id,
							name: attribute.name,
							price: Number.parseInt(attribute.price)
					  })
					: this.createAttribute(attribute)
			)
		);
	}

	openDeleteAttributeDialog(attribute: any) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить модификацию?",
					value: attribute
				}
			})
			.pipe(switchMap((attribute) => this.deleteAttribute(attribute.id)));
	}

	createAttribute(attr: CreateAttributeInput) {
		return this._createAttributeGQL.mutate({ attr: { ...attr, price: Number.parseFloat(attr.price as any) } }).pipe(
			map((result) => result.data?.createAttr),
			take(1),
			this._toastrService.observe("Модификация"),
			tap(async () => {
				await this._attributesQuery.refetch();
			})
		);
	}

	updateAttribute(attr: UpdateAttributeInput) {
		return this._updateAttributeGQL.mutate({ attr }).pipe(
			take(1),
			this._toastrService.observe("Модификация"),
			tap(async () => {
				await this._attributesQuery.refetch();
			})
		);
	}

	deleteAttribute(attrId: string) {
		return this._deleteAttributeGQL.mutate({ attrId }).pipe(
			take(1),
			this._toastrService.observe("Модификация"),
			tap(async () => {
				await this._attributesQuery.refetch();
			})
		);
	}
}
