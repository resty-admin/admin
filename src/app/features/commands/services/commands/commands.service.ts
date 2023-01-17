import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { lastValueFrom, Subject, tap } from "rxjs";
import { ChangesEnum } from "src/app/shared/enums";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CommandEntity, CreateCommandInput, UpdateCommandInput } from "../../../../../graphql";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CreateCommandGQL, DeleteCommandGQL, UpdateCommandGQL } from "../../graphql/commands";
import { CommandDialogComponent } from "../../ui/command-dialog/layout/command-dialog.component";

@Injectable({ providedIn: "root" })
export class CommandsService {
	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	readonly actions: IAction<CommandEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (command) => this.openUpdateCommandDialog(command)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command) => this.openDeleteCommandDialog(command)
		}
	];

	constructor(
		private readonly _createCommandGQL: CreateCommandGQL,
		private readonly _updateCommandGQL: UpdateCommandGQL,
		private readonly _deleteCommandGQL: DeleteCommandGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	async openCreateCommandDialog(data: AtLeast<CreateCommandInput, "place">) {
		const command: CommandEntity = await lastValueFrom(
			this._dialogService.open(CommandDialogComponent, { data }).afterClosed$
		);

		if (!command) {
			return;
		}

		return this.createCommand({ name: command.name, description: command.description, place: data.place });
	}

	async openUpdateCommandDialog(data: AtLeast<CommandEntity, "place">) {
		const command: CommandEntity = await lastValueFrom(
			this._dialogService.open(CommandDialogComponent, { data }).afterClosed$
		);

		if (!command) {
			return;
		}

		return this.updateCommand({ id: command.id, name: command.name, description: command.description });
	}

	async openDeleteCommandDialog(value: AtLeast<CommandEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить команду?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		return this.deleteCommand(value.id);
	}

	createCommand(command: CreateCommandInput) {
		return this._createCommandGQL.mutate({ command }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateCommand(command: UpdateCommandInput) {
		return this._updateCommandGQL.mutate({ command }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteCommand(commandId: string) {
		return this._deleteCommandGQL.mutate({ commandId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
