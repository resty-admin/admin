import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, switchMap, take } from "rxjs";
import type { ICommand } from "src/app/shared/interfaces";
import { CommandsService } from "src/app/shared/modules/commands";
import type { IAction } from "src/app/shared/ui/actions";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { CommandDialogComponent } from "../components";

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

	readonly actions: IAction<ICommand>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command?: ICommand) => this.openCommandDialog(command)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command?: ICommand) => {
				if (!command) {
					return;
				}

				this.openCommandDialog(command);
			}
		}
	];

	readonly commands$ = this._commandsService.commands$;

	constructor(
		private readonly _commandsService: CommandsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openCommandDialog(command?: Partial<ICommand>) {
		this._dialogService
			.open(CommandDialogComponent, { data: command })
			.afterClosed$.pipe(
				take(1),
				filter((result) => Boolean(result)),
				switchMap((command: Partial<ICommand>) =>
					command.id
						? this._commandsService
								.updateCommand(command.id, command)
								.pipe(take(1), this._toastrService.observe("Комманды"))
						: this._commandsService.createCommand(command).pipe(take(1), this._toastrService.observe("Комманды"))
				)
			)
			.subscribe(async () => {
				await this._commandsService.refetchCommands();
			});
	}

	openDeleteCommandDialog(command: Partial<ICommand>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить пользователя?",
					value: command
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((command) => Boolean(command)),
				switchMap((command) => this._commandsService.deleteCommand(command.id))
			)
			.subscribe();
	}
}
