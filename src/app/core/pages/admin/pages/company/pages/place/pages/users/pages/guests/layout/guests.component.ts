import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UserDialogComponent, UsersService } from "@features/users";
import type { UserEntity } from "@graphql";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { ConfirmationDialogComponent } from "@shared/ui/confirmation-dialog";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, switchMap, take } from "rxjs";

import { GuestsPageGQL } from "../graphql";

@Component({
	selector: "app-guests",
	templateUrl: "./guests.component.html",
	styleUrls: ["./guests.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestsComponent implements OnInit {
	private readonly _guestsPageQuery = this._guestsPageGQL.watch();
	readonly guests$ = this._guestsPageQuery.valueChanges.pipe(
		map((result) => (result.data.usersToPlaces.data || []).map((userToPlace) => userToPlace.user))
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _guestsPageGQL: GuestsPageGQL,
		private readonly _usersService: UsersService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		await this._guestsPageQuery.setVariables({
			filtersArgs: [
				{ key: "place.id", operator: "=", value: this._routerService.getParams(PLACE_ID.slice(1)) },
				{ key: "user.role", operator: "=", value: UserRoleEnum.Client }
			]
		});
	}

	openUpdateUserDialog(data: AtLeast<UserEntity, "id">) {
		this._dialogService
			.open(UserDialogComponent, { data })
			.afterClosed$.pipe(
				filter((user) => Boolean(user)),
				switchMap((user) =>
					this._usersService.updateUser({ id: user.id, name: user.name, email: user.email, tel: user.tel }).pipe(
						switchMap(() => this._guestsPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("GUESTS.UPDATE"))
					)
				),
				take(1)
			)
			.subscribe();
	}

	openDeleteUserDialog(value: AtLeast<UserEntity, "id">) {
		this._dialogService
			.open(ConfirmationDialogComponent, {
				data: { title: this._i18nService.translate("GUESTS.CONFIRM"), value }
			})
			.afterClosed$.pipe(
				filter((user) => Boolean(user)),
				switchMap(() =>
					this._usersService.deleteUser(value.id).pipe(
						switchMap(() => this._guestsPageQuery.refetch()),
						this._toastrService.observe(this._i18nService.translate("GUESTS.DELETE"))
					)
				),
				take(1)
			)
			.subscribe();
	}
}
