import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";

import { ROLES_DATA } from "../data";

@Component({
	selector: "app-role",
	templateUrl: "./role.component.html",
	styleUrls: ["./role.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleComponent implements OnInit {
	readonly roles = ROLES_DATA;

	redirect = ADMIN_ROUTES.SIGN_UP.absolutePath;

	constructor(readonly sharedService: SharedService, private readonly _routerService: RouterService) {}

	ngOnInit() {
		this.redirect = this._routerService.getQueryParams("redirect");
	}
}
