import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { AttributeGroupsService, AttributesService } from "src/app/features/attributes";
import { PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { AttributesPageGQL } from "../graphql/attributes-page";

@UntilDestroy()
@Component({
	selector: "app-attributes",
	templateUrl: "./attributes.component.html",
	styleUrls: ["./attributes.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttributesComponent implements OnInit {
	private readonly _attributesPageQuery = this._attributesPageGQL.watch();
	readonly attributeGroups$ = this._attributesPageQuery.valueChanges.pipe(
		map((result) => result.data.attributeGroups.data)
	);

	readonly attributesGroupActions = this._attributeGroupsService.actions;
	readonly attributeActions = this._attributesService.actions;

	constructor(
		private readonly _attributesPageGQL: AttributesPageGQL,
		private readonly _attributeGroupsService: AttributeGroupsService,
		private readonly _attributesService: AttributesService,
		private readonly _routerService: RouterService
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

	openCreateAttributeDialog() {
		this._attributeGroupsService.openCreateAttributeGroupDialog().pipe(take(1)).subscribe();
	}
}
