import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ConnectToPlaceComponent } from "./layout/connect-to-place.component";

export const CONNECT_TO_PLACE_ROUTES: Route[] = [
	{
		path: "",
		component: ConnectToPlaceComponent,
		data: {
			animation: "connectToPlace"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONNECT_TO_PLACE_ROUTES)],
	exports: [RouterModule]
})
export class ConnectToPlaceRoutingModule {}
