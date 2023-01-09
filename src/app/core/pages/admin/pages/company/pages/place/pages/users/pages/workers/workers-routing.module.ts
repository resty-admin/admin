import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { WorkersComponent } from "./layout/workers.component";

export const WORKERS_ROUTES: Route[] = [
	{
		path: "",
		component: WorkersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(WORKERS_ROUTES)],
	exports: [RouterModule]
})
export class WorkersRoutingModule {}
