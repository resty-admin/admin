import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { TablesComponent } from "./layout/tables.component";

export const TABLES_ROUTES: Route[] = [
	{
		path: "",
		component: TablesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(TABLES_ROUTES)],
	exports: [RouterModule]
})
export class TablesRoutingModule {}
