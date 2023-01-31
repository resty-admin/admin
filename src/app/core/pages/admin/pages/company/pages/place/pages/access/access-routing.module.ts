import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { AccessPageSkeletonComponent } from "./components";
import { ACCESS_PAGE } from "./constants";
import { AccessComponent } from "./layout/access.component";
import { AccessPageResolver } from "./resolvers";

export const ACCESS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: AccessComponent,
		data: {
			animation: ACCESS_PAGE
		},
		resolve: {
			places: AccessPageResolver
		},
		skeleton: {
			component: AccessPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACCESS_ROUTES)],
	exports: [RouterModule]
})
export class AccessRoutingModule {}
