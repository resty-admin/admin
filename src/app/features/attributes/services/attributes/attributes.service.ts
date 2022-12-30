import { Inject } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAttribute } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateAttributeInput, UpdateAttributeInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { AttributeDialogComponent } from "../../components";
import { AttributesGQL, CreateAttrGQL, DeleteAttrGQL, UpdateAttrGQL } from "../../graphql/attributes";

@Inject({ providedIn: "root" })
export class AttributesService {
	readonly attributes$ = this._attributesGQL.watch().valueChanges.pipe(map((result) => result.data.attributes.data));

	readonly actions: IAction<IAttribute>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (attribute?: IAttribute) => this.openCreateOrUpdateAttributeDialog(attribute)
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
		private readonly _attributesGQL: AttributesGQL,
		private readonly _createAttributeGQL: CreateAttrGQL,
		private readonly _updateAttributeGQL: UpdateAttrGQL,
		private readonly _deleteAttributeGQL: DeleteAttrGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._attributesGQL.watch().refetch();
	}

	openCreateOrUpdateAttributeDialog(attribute?: any) {
		return this._dialogService
			.openFormDialog(AttributeDialogComponent, { data: { attribute } })
			.pipe(
				switchMap((attribute: any) =>
					attribute.id ? this.updateAttribute(attribute) : this.createAttribute(attribute)
				)
			);
	}

	openDeleteAttributeDialog(attribute: IAttribute) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить модификацию?",
					value: attribute
				}
			})
			.pipe(switchMap((attribute) => this._deleteAttributeGQL.mutate(attribute.id)));
	}

	createAttribute(attr: CreateAttributeInput) {
		return this._createAttributeGQL.mutate({ attr }).pipe(
			take(1),
			this._toastrService.observe("Модификация"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateAttribute(attr: UpdateAttributeInput) {
		return this._updateAttributeGQL.mutate({ attr }).pipe(
			take(1),
			this._toastrService.observe("Модификация"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteAttribute(attrId: string) {
		return this._deleteAttributeGQL.mutate({ attrId }).pipe(
			take(1),
			this._toastrService.observe("Модификация"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
