import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { filter, from, switchMap, take } from "rxjs";
import type { IUser } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { UsersService } from "../../../../../../../../../../shared/modules/users";
import type { IAction } from "../../../../../../../../../../shared/ui/actions";
import { ConfirmationDialogComponent } from "../../../../../../../../../../shared/ui/confirmation-dialog";
import { UserDialogComponent } from "../components";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly users$ = this._usersService.users$;

	readonly actions: IAction<IUser>[] = [
		{
			label: "Редактировать",
			icon: "edit",
			func: (user?: IUser) => this.openUserDialog(user)
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

	columns: IDatatableColumn[] = [];

	constructor(
		private readonly _usersService: UsersService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openUserDialog(user?: Partial<IUser>) {
		this._dialogService
			.open(UserDialogComponent, { data: user })
			.afterClosed$.pipe(
				take(1),
				filter((user) => Boolean(user)),
				switchMap((user: Partial<IUser>) =>
					user.id
						? this._usersService.updateUser(user.id, user).pipe(take(1), this._toastrService.observe("Пользователи"))
						: this._usersService.createUser(user).pipe(take(1), this._toastrService.observe("Пользователи"))
				),
				switchMap(() => from(this._usersService.refetchUsers()))
			)
			.subscribe();
	}

	openDeleteUserDialog(user: Partial<IUser>) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: {
					title: "Вы уверены, что хотите удалить пользователя?",
					value: user
				}
			})
			.afterClosed$.pipe(
				take(1),
				filter((user) => Boolean(user)),
				switchMap((user) => this._usersService.deleteUser(user.id))
			)
			.subscribe();
	}

	ngAfterViewInit() {
		this.columns = [
			{
				prop: "name",
				name: "ФИО"
			},
			{
				prop: "email",
				name: "Почта"
			},
			{
				prop: "tel",
				name: "Телефон"
			},
			{
				prop: "role",
				name: "Роль"
			},
			{
				cellTemplate: this.moreTemplate
			}
		];
	}
}
