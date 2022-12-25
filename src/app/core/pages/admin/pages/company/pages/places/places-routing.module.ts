import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { PlacesComponent } from "./layout/places.component";

export const PLACES_ROUTES: Route[] = [
	{
		path: "",
		component: PlacesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(PLACES_ROUTES)],
	exports: [RouterModule]
})
export class PlacesRoutingModule {}
