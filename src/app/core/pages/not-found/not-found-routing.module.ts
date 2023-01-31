import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { NOT_FOUND_PAGE } from "./constants";
import { NotFoundComponent } from "./layout/not-found.component";

export const NOT_FOUND_ROUTES: Route[] = [
	{
		path: "",
		component: NotFoundComponent,
		data: {
			animation: NOT_FOUND_PAGE
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(NOT_FOUND_ROUTES)],
	exports: [RouterModule]
})
export class NotFoundRoutingModule {}
