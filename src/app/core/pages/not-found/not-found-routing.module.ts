import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { NotFoundComponent } from "./layout/not-found.component";

export const NOT_FOUND_ROUTES: Route[] = [
	{
		path: "",
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(NOT_FOUND_ROUTES)],
	exports: [RouterModule]
})
export class NotFoundRoutingModule {}
