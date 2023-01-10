import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UsersService } from "src/app/features/users";
import { ADMIN_ROUTES } from "src/app/shared/constants";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
	readonly pages = [
		{
			label: "Работники",
			routerLink: ADMIN_ROUTES.WORKERS.path
		},
		{
			label: "Гости",
			routerLink: ADMIN_ROUTES.GUESTS.path
		}
	];

	constructor(private readonly _usersService: UsersService) {}

	openUserDialog(user?: Partial<any>) {
		this._usersService.openCreateOrUpdateUserDialog(user).subscribe();
	}
}
