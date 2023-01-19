import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { WelcomeComponent } from "./layout/welcome.component";

export const WELCOME_ROUTES: Route[] = [
	{
		path: "",
		component: WelcomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(WELCOME_ROUTES)],
	exports: [RouterModule]
})
export class WelcomeRoutingModule {}
