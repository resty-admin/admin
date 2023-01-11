import { Injectable } from "@angular/core";
import { filter, switchMap, take } from "rxjs";

import type { CreateUserInput, UpdateUserInput } from "../../../../../graphql";
import type { UserEntity } from "../../../../../graphql";
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
			func: (user?: UserEntity) => this.openUpdateUserDialog(user).subscribe()
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
		private readonly _createUserGQL: CreateUserGQL,
		private readonly _updateUserGQL: UpdateUserGQL,
		private readonly _deleteUserGQL: DeleteUserGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openCreateUserDialog() {
		return this._dialogService.open(UserDialogComponent).afterClosed$.pipe(
			take(1),
			filter((user) => Boolean(user)),
			switchMap((user: any) => this.createUser(user))
		);
	}

	openUpdateUserDialog(user: any) {
		return this._dialogService.open(UserDialogComponent, { data: user }).afterClosed$.pipe(
			take(1),
			filter((user) => Boolean(user)),
			switchMap((user: any) => this.updateUser(user))
		);
	}

	openDeleteUserDialog(user: any) {
		const config = {
			data: {
				title: "Вы уверены, что хотите удалить пользователя?",
				value: user
			}
		};

		return this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$.pipe(
			take(1),
			filter((user) => Boolean(user)),
			switchMap((table) => this.deleteUser(table.id))
		);
	}

	createUser(user: CreateUserInput) {
		return this._createUserGQL.mutate({ user });
	}

	updateUser(user: UpdateUserInput) {
		return this._updateUserGQL.mutate({ user });
	}

	deleteUser(userId: string) {
		return this._deleteUserGQL.mutate({ userId });
	}
}
