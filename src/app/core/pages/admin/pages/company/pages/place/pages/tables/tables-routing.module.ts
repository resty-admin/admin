import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { TablesPageSkeletonComponent } from "./components";
import { TABLES_PAGE } from "./constants";
import { TablesComponent } from "./layout/tables.component";
import { TablesPageResolver } from "./resolvers";

export const TABLES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: TablesComponent,
		data: {
			animation: TABLES_PAGE
		},
		resolve: {
			tables: TablesPageResolver
		},
		skeleton: {
			component: TablesPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(TABLES_ROUTES)],
	exports: [RouterModule]
})
export class TablesRoutingModule {}
