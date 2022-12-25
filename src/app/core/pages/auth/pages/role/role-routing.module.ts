import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { RoleComponent } from "./layout/role.component";

export const ROLE_ROUTES: Route[] = [
	{
		path: "",
		component: RoleComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ROLE_ROUTES)],
	exports: [RouterModule]
})
export class RoleRoutingModule {}
