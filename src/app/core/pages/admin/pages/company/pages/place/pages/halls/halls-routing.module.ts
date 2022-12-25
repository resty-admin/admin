import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { HallsComponent } from "./layout/halls.component";

export const HALLS_ROUTES: Route[] = [
	{
		path: "",
		component: HallsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(HALLS_ROUTES)],
	exports: [RouterModule]
})
export class HallsRoutingModule {}
