import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserDialogComponent, UsersService } from "@features/users";
import type { UserEntity } from "@graphql";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, from, switchMap, take } from "rxjs";

import { GUESTS_PAGE } from "../constants";
import { GuestsPageService } from "../services";

@Component({
	selector: "app-guests",
	templateUrl: "./guests.component.html",
	styleUrls: ["./guests.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent {
	readonly guestsPage = GUESTS_PAGE;

	readonly guests$ = this._guestsPageService.guests$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _guestsPageService: GuestsPageService,
		private readonly _usersService: UsersService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		this._dialogService
			.open(UserDialogComponent, { data })
			.afterClosed$.pipe(
				filter((user) => Boolean(user)),
				switchMap((user) =>
					this._usersService.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel }).pipe(
						switchMap(() => from(this._guestsPageService.guestsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("title"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("confirm"), value }
			})
			.afterClosed$.pipe(
				filter((user) => Boolean(user)),
				switchMap(() =>
					this._usersService.deleteUser(value.id).pipe(
						switchMap(() => from(this._guestsPageService.guestsPageQuery.refetch())),
						this._toastrService.observe(this._i18nService.translate("title"))
					)
				),
				take(1)
			)
			.subscribe();
	}
}
