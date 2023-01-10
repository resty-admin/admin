import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map } from "rxjs";

import { CommandsService } from "../../../../../../../../../../features/commands/services/commands.service";
import { PLACE_ID } from "../../../../../../../../../../shared/constants";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import type { IAction } from "../../../../../../../../../../shared/ui/actions";
import { CommandsPageGQL } from "../graphql/commands-page";

@UntilDestroy()
@Component({
	selector: "app-commands",
	templateUrl: "./commands.component.html",
	styleUrls: ["./commands.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsComponent implements OnInit {
	private readonly _commandsPageQuery = this._commandsPageGQL.watch();
	readonly commands$ = this._commandsPageQuery.valueChanges.pipe(map((result) => result.data.commands.data));

	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command?: any) => this.openCreateOrUpdateCommandDialog(command)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command?: any) => {
				if (!command) {
					return;
				}

				this.openDeleteCommandDialog(command);
			}
		}
	];

	constructor(
		private readonly _routerService: RouterService,
		private readonly _commandsPageGQL: CommandsPageGQL,
		private readonly _commandsService: CommandsService
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

	openCreateOrUpdateCommandDialog(command?: any) {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._commandsService.openCreateOrUpdateCommandDialog({ ...command, place }).subscribe();
	}

	openDeleteCommandDialog(command: any) {
		this._commandsService.openDeleteCommandDialog(command).subscribe();
	}
}
