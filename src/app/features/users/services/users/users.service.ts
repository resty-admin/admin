import { Injectable } from "@angular/core";
import type { DeepPartial } from "@ngneat/reactive-forms/lib/types";
import type { Observable } from "rxjs";
import { lastValueFrom, Subject, tap } from "rxjs";

import type { CreateUserInput, UpdateUserInput } from "../../../../../graphql";
import type { UserEntity } from "../../../../../graphql";
import { ChangesEnum } from "../../../../shared/enums";
import type { AtLeast } from "../../../../shared/interfaces";
import type { IAction } from "../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../shared/ui/confirmation-dialog";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { CreateUserGQL, DeleteUserGQL, UpdateUserGQL } from "../../graphql/users";
import { UserDialogComponent } from "../../ui/user-dialog/layout/user-dialog.component";

@Injectable({ providedIn: "root" })
export class UsersService {
	readonly actions: IAction<UserEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (user) => this.openUpdateUserDialog(user)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (user) => this.openDeleteUserDialog(user)
		}
	];

	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();

	constructor(
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	private _emitChanges<T>(changes: string): (source$: Observable<T>) => Observable<T> {
		return (source$) => source$.pipe(tap(() => this._changesSubject.next(changes)));
	}

	async openCreateUserDialog(data?: DeepPartial<UserEntity>) {
		const user: UserEntity = await lastValueFrom(this._dialogService.open(UserDialogComponent, { data }).afterClosed$);

		if (!user) {
			return;
		}

		return lastValueFrom(this.createUser({ name: user.name, email: user.name, role: user.role }));
	}

	async openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		const user: UserEntity = await lastValueFrom(this._dialogService.open(UserDialogComponent, { data }).afterClosed$);

		if (!user) {
			return null;
		}

		return lastValueFrom(this.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel }));
	}

	async openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		const config = { data: { title: "Вы уверены, что хотите удалить пользователя?", value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(this.deleteUser(value.id));
	}

	createUser(user: CreateUserInput) {
		return this._createUserGQL.mutate({ user }).pipe(this._emitChanges(ChangesEnum.CREATE));
	}

	updateUser(user: UpdateUserInput) {
		return this._updateUserGQL.mutate({ user }).pipe(this._emitChanges(ChangesEnum.UPDATE));
	}

	deleteUser(userId: string) {
		return this._deleteUserGQL.mutate({ userId }).pipe(this._emitChanges(ChangesEnum.DELETE));
	}
}
