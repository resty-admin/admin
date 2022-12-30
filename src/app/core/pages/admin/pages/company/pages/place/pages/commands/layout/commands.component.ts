import { ChangeDetectionStrategy, Component } from "@angular/core";
import { CommandsService } from "src/app/features/commands";
import { PLACE_ID } from "src/app/shared/constants";
import type { ICommand } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

@Component({
	selector: "app-commands",
	templateUrl: "./commands.component.html",
	styleUrls: ["./commands.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandsComponent {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly actions = this._commandsService.actions;

	readonly commands$ = this._commandsService.commands$;

	constructor(private readonly _commandsService: CommandsService, private readonly _routerService: RouterService) {}

	openCreateCommandDialog() {
		const place = this._routerService.getParams(PLACE_ID.slice(1));

		this._commandsService.openCreateOrUpdateCommandDialog({ place }).subscribe();
	}

	openDeleteCommandDialog(command: ICommand) {
		this._commandsService.openDeleteCommandDialog(command).subscribe();
	}
}
