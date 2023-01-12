import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { filter, Subject, switchMap, take, tap } from "rxjs";
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
			func: (command) => this.openUpdateCommandDialog(command).pipe(take(1)).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (command) => {
				this.openDeleteCommandDialog(command).pipe(take(1)).subscribe();
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

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	openCreateCommandDialog(data: AtLeast<CreateCommandInput, "place">) {
		return this._dialogService.open(CommandDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((command) => Boolean(command)),
			switchMap((command: CommandEntity) =>
				this.createCommand({ name: command.name, description: command.description, place: data.place })
			)
		);
	}

	openUpdateCommandDialog(data: AtLeast<CommandEntity, "place">) {
		return this._dialogService.open(CommandDialogComponent, { data }).afterClosed$.pipe(
			take(1),
			filter((command) => Boolean(command)),
			switchMap((command: CommandEntity) =>
				this.updateCommand({ id: command.id, name: command.name, description: command.description })
			)
		);
	}

	openDeleteCommandDialog(value: AtLeast<CommandEntity, "place">) {
		const config = { data: { title: "Вы уверены, что хотите удалить команду?", value } };

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((command) => Boolean(command)),
			switchMap((command: CommandEntity) => this.deleteCommand(command.id))
		);
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
