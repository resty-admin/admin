import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { PROFILE_PAGE } from "./constants";
import { ProfileComponent } from "./layout/profile.component";

export const PROFILE_ROUTES: Route[] = [
	{
		path: "",
		component: ProfileComponent,
		data: {
			animation: PROFILE_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PROFILE_ROUTES)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
