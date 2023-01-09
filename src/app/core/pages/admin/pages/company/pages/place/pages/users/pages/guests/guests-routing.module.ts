import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { GuestsComponent } from "./layout/guests.component";

export const GUESTS_ROUTES: Route[] = [
	{
		path: "",
		component: GuestsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(GUESTS_ROUTES)],
	exports: [RouterModule]
})
export class GuestsRoutingModule {}
