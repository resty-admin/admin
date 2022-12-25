import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { UsersComponent } from "./layout/users.component";

export const USERS_ROUTES: Route[] = [
	{
		path: "",
		component: UsersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(USERS_ROUTES)],
	exports: [RouterModule]
})
export class UserRoutingModule {}
