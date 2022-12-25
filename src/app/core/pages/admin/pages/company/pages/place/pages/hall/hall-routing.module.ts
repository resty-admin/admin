import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { HallComponent } from "./layout/hall.component";

export const HALL_ROUTES: Route[] = [
	{
		path: "",
		component: HallComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(HALL_ROUTES)],
	exports: [RouterModule]
})
export class HallRoutingModule {}
