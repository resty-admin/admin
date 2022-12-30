import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { Observable } from "rxjs";
import { AttributeGroupsService, AttributesService } from "src/app/features/attributes";
import { PLACE_ID } from "src/app/shared/constants";
import type { IAttribute, IAttributeGroup } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import type { IAction } from "src/app/shared/ui/actions";

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
		private readonly _attributesService: AttributesService,
		private readonly _routerService: RouterService
	) {}

	openCreateAttributeGroupDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._attributeGroupsService.openCreateOrUpdateAttributeGroupDialog({ place }).subscribe();
	}
}
