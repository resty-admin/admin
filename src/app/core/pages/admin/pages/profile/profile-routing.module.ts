import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ProfileComponent } from "./layout/profile.component";

export const PROFILE_ROUTES: Route[] = [
	{
		path: "",
		component: ProfileComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PROFILE_ROUTES)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
