import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ADMIN_ROUTES } from "../../../../../../../../../shared/routes";
import { UsersComponent } from "./layout/users.component";

export const USERS_ROUTES: Route[] = [
	{
		path: "",
		component: UsersComponent,
		children: [
			{
				...ADMIN_ROUTES.WORKERS,
				loadChildren: () => import("./pages/workers/workers.module").then((m) => m.WorkersModule)
			},
			{
				...ADMIN_ROUTES.GUESTS,
				loadChildren: () => import("./pages/guests/guests.module").then((m) => m.GuestsModule)
			},
			{
				path: "",
				pathMatch: "full",
				redirectTo: ADMIN_ROUTES.WORKERS.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(USERS_ROUTES)],
	exports: [RouterModule]
})
export class UserRoutingModule {}
