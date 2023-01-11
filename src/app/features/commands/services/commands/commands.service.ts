import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateCommandInput, UpdateCommandInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CreateCommandGQL, DeleteCommandGQL, UpdateCommandGQL } from "../../graphql/commands";
import { CommandDialogComponent } from "../../ui/command-dialog/layout/command-dialog.component";

@Injectable({ providedIn: "root" })
export class CommandsService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command?: any) => this.openUpdateDialog(command).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command?: any) => {
				if (!command) {
					return;
				}

				this.openDeleteCommandDialog(command).subscribe();
			}
		}
	];

	constructor(
		private readonly _createCommandGQL: CreateCommandGQL,
		private readonly _updateCommandGQL: UpdateCommandGQL,
		private readonly _deleteCommandGQL: DeleteCommandGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openCreateDialog(data?: any) {
		return this._dialogService.open(CommandDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((command) => Boolean(command)),
			switchMap((command: any) => this.createCommand(command))
		);
	}

	openUpdateDialog(data?: any) {
		return this._dialogService.open(CommandDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((command) => Boolean(command)),
			switchMap((command: any) => this.updateCommand(command))
		);
	}

	openDeleteCommandDialog(command: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить команду?",
				value: command
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((command) => Boolean(command)),
			switchMap((command) => this.deleteCommand(command.id))
		);
	}

	createCommand(command: CreateCommandInput) {
		return this._createCommandGQL.mutate({ command });
	}

	updateCommand(command: UpdateCommandInput) {
		return this._updateCommandGQL.mutate({ command });
	}

	deleteCommand(commandId: string) {
		return this._deleteCommandGQL.mutate({ commandId });
	}
}
