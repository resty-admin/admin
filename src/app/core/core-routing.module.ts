import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "@features/auth";
import { UserRoleEnum } from "@graphql";
import { ADMIN_ROUTES } from "@shared/constants";

import { ROUTER_CONFIG } from "./configs/router.config";

export const CORE_ROUTES: Route[] = [
	{
		...ADMIN_ROUTES.AUTH,
		loadChildren: () => import("./pages/auth/auth.module").then((m) => m.AuthModule)
	},
	{
		...ADMIN_ROUTES.ADMIN,
		canActivate: [AuthGuard],
		data: {
			roles: [UserRoleEnum.Admin, UserRoleEnum.Manager, UserRoleEnum.Waiter, UserRoleEnum.Hostess, UserRoleEnum.Hookah]
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
