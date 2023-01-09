import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { UserRoleEnum } from "../../graphql";
import { ADMIN_ROUTES } from "../shared/routes";
import { ROUTER_CONFIG } from "./configs/router.config";
import { AuthGuard } from "./pages/auth/guards";

export const CORE_ROUTES: Route[] = [
	{
		...ADMIN_ROUTES.AUTH,
		loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule)
	},
	{
		...ADMIN_ROUTES.ADMIN,
		canActivate: [AuthGuard],
		data: {
			roles: [UserRoleEnum.Admin, UserRoleEnum.Waiter, UserRoleEnum.Hostess, UserRoleEnum.Hookah]
		},
		loadChildren: () => import("./pages/admin/admin.module").then((m) => m.AdminModule)
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: ADMIN_ROUTES.ADMIN.path
	}
];
@NgModule({
	imports: [RouterModule.forRoot(CORE_ROUTES, ROUTER_CONFIG)],
	exports: [RouterModule]
})
export class CoreRoutingModule {}
