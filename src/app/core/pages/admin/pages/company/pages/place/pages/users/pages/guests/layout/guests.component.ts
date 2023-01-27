import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "@features/users";
import { UserDialogComponent } from "@features/users/ui";
import type { UserEntity } from "@graphql";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { SharedService } from "@shared/services";
import type { IAction } from "@shared/ui/actions";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import type { IDatatableColumn } from "@shared/ui/datatable";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { GUESTS_PAGE } from "../constants";
import { GuestsPageGQL } from "../graphql";

@Component({
	selector: "app-guests",
	templateUrl: "./guests.component.html",
	styleUrls: ["./guests.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent implements AfterViewInit {
	@ViewChild("moreTemplate", { static: true }) moreTemplate!: TemplateRef<unknown>;

	readonly guestsPage = GUESTS_PAGE;

	private readonly _guestsPageQuery = this._guestsPageGQL.watch();
	readonly guests$ = this._activatedRoute.data.pipe(map((data) => data["guests"]));

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

	columns: IDatatableColumn[] = [];

	constructor(
		readonly sharedService: SharedService,
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _usersService: UsersService,
		private readonly _guestsPageGQL: GuestsPageGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

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

	async openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		const user: UserEntity | undefined = await lastValueFrom(
			this._dialogService.open(UserDialogComponent, { data }).afterClosed$
		);

		if (!user) {
			return;
		}

		await lastValueFrom(
			this._usersService
				.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel })
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.guestsPage),
						this._i18nService.translate("updated", {}, this.guestsPage)
					)
				)
		);

		await this._guestsPageQuery.refetch();
	}

	async openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		const config = { data: { title: this._i18nService.translate("confirm", {}, this.guestsPage), value } };

		const isConfirmed = await lastValueFrom(this._dialogService.open(ConfirmationDialogComponent, config).afterClosed$);

		if (!isConfirmed) {
			return;
		}

		await lastValueFrom(
			this._usersService
				.deleteUser(value.id)
				.pipe(
					this._toastrService.observe(
						this._i18nService.translate("title", {}, this.guestsPage),
						this._i18nService.translate("deleted", {}, this.guestsPage)
					)
				)
		);

		await this._guestsPageQuery.refetch();
	}
}
