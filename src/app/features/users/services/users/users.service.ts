import { Injectable } from "@angular/core";
import { map, switchMap, take, tap } from "rxjs";
import type { IAction } from "src/app/shared/ui/actions";
import { ConfirmationDialogComponent } from "src/app/shared/ui/confirmation-dialog";

import type { CreateUserInput, UpdateUserInput, UserEntity } from "../../../../../graphql";
import { DialogService } from "../../../../shared/ui/dialog";
import { ToastrService } from "../../../../shared/ui/toastr";
import { UserDialogComponent } from "../../components";
import { CreateUserGQL, DeleteUserGQL, UpdateUserGQL, UsersGQL } from "../../graphql/users";

@Injectable({ providedIn: "root" })
export class UsersService {
	private readonly _usersQuery = this._usersGQL.watch({ skip: 0, take: 10 });

	readonly users$ = this._usersQuery.valueChanges.pipe(map((result) => result.data.users.data));

	readonly actions: IAction<UserEntity>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (user?: UserEntity) => this.openCreateOrUpdateUserDialog(user).subscribe()
		},
		{
			label: "Удалить",
			icon: "delete",
			func: (user?: UserEntity) => {
				if (!user) {
					return;
				}

				this.openDeleteUserDialog(user).subscribe();
			}
		}
	];

	constructor(
		private readonly _usersGQL: UsersGQL,
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openCreateOrUpdateUserDialog(data?: any) {
		return this._dialogService.openFormDialog(UserDialogComponent, { data }).pipe(
			switchMap((user: any) =>
				user.id
					? this.updateUser({
							id: user.id,
							tel: user.tel,
							email: user.email
					  })
					: this.createUser(user)
			)
		);
	}

	openDeleteUserDialog(user: UserEntity) {
		return this._dialogService
			.openFormDialog(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить пользователя?",
					value: user
				}
			})
			.pipe(switchMap((user) => this.deleteUser(user.id)));
	}

	createUser(user: CreateUserInput) {
		return this._createUserGQL.mutate({ user }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this._usersQuery.refetch();
			})
		);
	}

	updateUser(user: UpdateUserInput) {
		return this._updateUserGQL.mutate({ user }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this._usersQuery.refetch();
			})
		);
	}

	deleteUser(userId: string) {
		return this._deleteUserGQL.mutate({ userId }).pipe(
			take(1),
			this._toastrService.observe("Пользователи"),
			tap(async () => {
				await this._usersQuery.refetch();
			})
		);
	}
}
