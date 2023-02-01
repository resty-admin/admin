import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { PlacesPageSkeletonComponent } from "./components";
import { PlacesComponent } from "./layout/places.component";
import { PlacesPageResolver } from "./resolvers";

export const PLACES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: PlacesComponent,
		data: {
			animation: "placesPage"
		},
		resolve: {
			places: PlacesPageResolver
		},
		skeleton: {
			component: PlacesPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(PLACES_ROUTES)],
	exports: [RouterModule]
})
export class PlacesRoutingModule {}
