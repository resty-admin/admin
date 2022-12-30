import { Inject } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IUser } from "src/app/shared/interfaces";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateUserInput, UpdateUserInput } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { UserDialogComponent } from "../../components";
import { CreateUserGQL, DeleteUserGQL, UpdateUserGQL, UsersGQL } from "../../graphql/users";

@Inject({ providedIn: "root" })
export class UsersService {
	readonly actions: IAction<IUser>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (user?: IUser) => this.openCreateOrUpdateUserDialog(user)
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (user?: IUser) => {
				if (!user) {
					return;
				}

				this.openDeleteUserDialog(user);
			}
		}
	];

	readonly users$ = this._usersGQL.watch().valueChanges.pipe(map((result) => result.data.users.data));

	constructor(
		private readonly _usersGQL: UsersGQL,
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	async refetch() {
		await this._usersGQL.watch().refetch();
	}

	openCreateOrUpdateUserDialog(user?: any) {
		return this._dialogService
			.openFormDialog(UserDialogComponent, { data: { user } })
			.pipe(switchMap((user: any) => (user.id ? this.updateUser(user) : this.createUser(user))));
	}

	openDeleteUserDialog(user: IUser) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить пользователя?",
					value: user
				}
			})
			.pipe(switchMap((user) => this._deleteUserGQL.mutate(user.id)));
	}

	createUser(user: CreateUserInput) {
		return this._createUserGQL.mutate({ user }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	updateUser(user: UpdateUserInput) {
		return this._updateUserGQL.mutate({ user }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this.refetch();
			})
		);
	}

	deleteUser(userId: string) {
		return this._deleteUserGQL.mutate({ userId }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this.refetch();
			})
		);
	}
}
