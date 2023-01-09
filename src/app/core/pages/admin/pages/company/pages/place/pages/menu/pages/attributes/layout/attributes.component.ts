import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { AttributeGroupsService, AttributesService } from "src/app/features/attributes";
import { PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";
import type { IAction } from "src/app/shared/ui/actions";

import { AttributesPageGQL } from "../graphql/attributes-page";

@UntilDestroy()
@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent implements OnInit {
	readonly attributesGroupActions: IAction<any>[] = this._attributeGroupsService.actions;
	readonly attributeActions: IAction<any>[] = this._attributesService.actions;

	private readonly _attributesPageQuery = this._attributesPageGQL.watch();
	readonly attributeGroups$ = this._attributesPageQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	constructor(
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _attributesService: AttributesService,
		private readonly _routerService: RouterService,
		private readonly _attributesPageGQL: AttributesPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._attributesPageQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});
	}

	openCreateAttributeGroupDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._attributeGroupsService.openCreateOrUpdateAttributeGroupDialog({ place }).subscribe();
	}
}
