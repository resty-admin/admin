import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { AttributesService } from "src/app/features/attributes";
import { AttributeGroupsService } from "src/app/features/attributes/services/attribute-groups/attribute-groups.service";
import type { IAttribute, IAttributeGroup } from "src/app/shared/interfaces";

import type { IAction } from "../../../../../../../../../../../../shared/ui/actions";

@UntilDestroy()
@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent {
	readonly attributesGroups$: Observable<any> = this._attributeGroupsService.attributeGroups$;
	readonly attributesGroupActions: IAction<IAttributeGroup>[] = this._attributeGroupsService.actions;
	readonly attributeActions: IAction<IAttribute>[] = this._attributesService.actions;

	constructor(
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _attributesService: AttributesService
	) {}

	openCreateAttributeGroupDialog() {
		this._attributeGroupsService.openCreateOrUpdateAttributeGroupDialog().subscribe();
	}
}
