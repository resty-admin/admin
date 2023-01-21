import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "@shared/constants";

import { ROLE_PAGE_I18N } from "../constants";
import { ROLES_DATA } from "../data";

@Component({
	selector: "app-role",
	templateUrl: "./role.component.html",
	styleUrls: ["./role.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent {
	readonly rolePageI18n = ROLE_PAGE_I18N;
	readonly adminRoutes = ADMIN_ROUTES;
	readonly roles = ROLES_DATA;

	trackByFn(index: number) {
		return index;
	}
}
