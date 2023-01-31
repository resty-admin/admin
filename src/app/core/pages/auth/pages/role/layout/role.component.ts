import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "@shared/constants";
import { SharedService } from "@shared/services";

import { ROLES_DATA } from "../data";

@Component({
	selector: "app-role",
	templateUrl: "./role.component.html",
	styleUrls: ["./role.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent {
	readonly adminRoutes = ADMIN_ROUTES;
	readonly roles = ROLES_DATA;

	constructor(readonly sharedService: SharedService) {}
}
