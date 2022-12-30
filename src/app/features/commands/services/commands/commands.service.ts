import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { ICommand } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateCommandInput, UpdateCommandInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CommandDialogComponent } from "../../components";
import { CommandsGQL, CreateCommandGQL, DeleteCommandGQL, UpdateCommandGQL } from "../../graphql/commands";

@Injectable({ providedIn: "root" })
export class CommandsService {
	readonly actions: IAction<ICommand>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command?: ICommand) => this.openCreateOrUpdateCommandDialog(command)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command?: ICommand) => {
				if (!command) {
					return;
				}

				this.openDeleteCommandDialog(command);
			}
		}
	];

	readonly commands$ = this._commandsGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.commands.data));

	constructor(
		private readonly _commandsGQL: CommandsGQL,
		private readonly _createCommandGQL: CreateCommandGQL,
		private readonly _updateCommandGQL: UpdateCommandGQL,
		private readonly _deleteCommandGQL: DeleteCommandGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._commandsGQL.watch({ skip: 0, take: 5 }).refetch();
	}

	openCreateOrUpdateCommandDialog(data?: any) {
		return this._dialogService
			.openFormDialog(CommandDialogComponent, { data })
			.pipe(switchMap((command: any) => (command.id ? this.updateCommand(command) : this.createCommand(command))));
	}

	openDeleteCommandDialog(command: ICommand) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить команду?",
					value: command
				}
			})
			.pipe(switchMap((command) => this.deleteCommand(command.id)));
	}

	createCommand(command: CreateCommandInput) {
		return this._createCommandGQL.mutate({ command }).pipe(
			take(1),
			this._toastrService.observe("Комманды"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateCommand(command: UpdateCommandInput) {
		return this._updateCommandGQL.mutate({ command }).pipe(
			take(1),
			this._toastrService.observe("Комманды"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteCommand(commandId: string) {
		return this._deleteCommandGQL.mutate({ commandId }).pipe(
			take(1),
			this._toastrService.observe("Комманды"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
