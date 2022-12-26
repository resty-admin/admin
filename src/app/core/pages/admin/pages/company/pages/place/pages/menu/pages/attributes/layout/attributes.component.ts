import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { filter, switchMap, take } from "rxjs";
import type { IAttributesGroup } from "src/app/shared/interfaces";
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
import { AttributesGroupDialogComponent } from "../components";

@UntilDestroy()
@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent {
	readonly attributesGroups$ = this._attributesGroupsService.attributesGroups$;
	readonly actions: IAction<IAttributesGroup>[] = [
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

	constructor(
		private readonly _attributesService: AttributesService,
		private readonly _attributesGroupsService: AttributesGroupsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _routerService: RouterService
	) {}

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
								.pipe(take(1), this._toastrService.observe("Категории"))
						: this._attributesGroupsService
								.createAttributesGroup({
									...attributeGroup,
									place: this._routerService.getParams(PLACE_ID.slice(1))
								} as unknown as any)
								.pipe(take(1), this._toastrService.observe("Категории"))
				)
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
}
