import { Injectable } from "@angular/core";
import { switchMap, take } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateCommandInput, UpdateCommandInput } from "../../../../graphql";
import { CommandDialogComponent } from "../../../core/pages/admin/pages/company/pages/place/pages/commands/components";
import { DialogService } from "../../../shared/ui/dialog";
import { ToastrService } from "../../../shared/ui/toastr";
import { CreateCommandGQL, DeleteCommandGQL, UpdateCommandGQL } from "../graphql/commands";

@Injectable({ providedIn: "root" })
export class CommandsService {
	readonly actions: IAction<any>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command?: any) => this.openCreateOrUpdateCommandDialog(command).subscribe()
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

	openCreateOrUpdateCommandDialog(data?: any) {
		return this._dialogService.openFormDialog(CommandDialogComponent, { data }).pipe(
			switchMap((command: any) =>
				command.id
					? this.updateCommand({
							id: command.id,
							name: command.name,
							description: command.description
					  })
					: this.createCommand(command)
			)
		);
	}

	openDeleteCommandDialog(command: any) {
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
		return this._createCommandGQL.mutate({ command }).pipe(take(1), this._toastrService.observe("Комманды"));
	}

	updateCommand(command: UpdateCommandInput) {
		return this._updateCommandGQL.mutate({ command }).pipe(take(1), this._toastrService.observe("Комманды"));
	}

	deleteCommand(commandId: string) {
		return this._deleteCommandGQL.mutate({ commandId }).pipe(take(1), this._toastrService.observe("Комманды"));
	}
}
