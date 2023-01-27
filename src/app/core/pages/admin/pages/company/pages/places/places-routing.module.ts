import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PlacesSkeletonComponent } from "./components";
import { PLACES_PAGE } from "./constants";
import { PlacesComponent } from "./layout/places.component";
import { PlacesResolver } from "./resolvers";

export const PLACES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PlacesComponent,
		data: {
			animation: PLACES_PAGE
		},
		resolve: {
			places: PlacesResolver
		},
		skeleton: {
			component: PlacesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PLACES_ROUTES)],
	exports: [RouterModule]
})
export class PlacesRoutingModule {}
