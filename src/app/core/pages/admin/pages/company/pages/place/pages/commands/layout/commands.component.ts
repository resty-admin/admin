import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";
import { CommandsService } from "src/app/features/commands";
import { PLACE_ID } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { CommandsPageGQL } from "../graphql/commands";

@UntilDestroy()
@Component({
	selector: "app-commands",
	templateUrl: "./commands.component.html",
	styleUrls: ["./commands.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsComponent implements OnInit {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly actions = this._commandsService.actions;

	private readonly _commandsPageQuery = this._commandsPageGQL.watch();
	readonly commands$ = this._commandsPageQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(
		private readonly _commandsService: CommandsService,
		private readonly _routerService: RouterService,
		private readonly _commandsPageGQL: CommandsPageGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(PLACE_ID.slice(1))
			.pipe(untilDestroyed(this))
			.subscribe(async (placeId) => {
				await this._commandsPageQuery.setVariables({
					filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
				});
			});
	}

	openCreateCommandDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._commandsService.openCreateOrUpdateCommandDialog({ place }).subscribe();
	}

	openDeleteCommandDialog(command: any) {
		this._commandsService.openDeleteCommandDialog(command).subscribe();
	}
}
