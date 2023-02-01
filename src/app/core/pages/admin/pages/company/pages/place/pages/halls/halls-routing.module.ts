import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { HallsPageSkeletonComponent } from "./components";
import { HallsComponent } from "./layout/halls.component";
import { HallsPageResolver } from "./resolvers";

export const HALLS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: HallsComponent,
		data: {
			animation: "hallsPage"
		},
		resolve: {
			halls: HallsPageResolver
		},
		skeleton: {
			component: HallsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(HALLS_ROUTES)],
	exports: [RouterModule]
})
export class HallsRoutingModule {}
