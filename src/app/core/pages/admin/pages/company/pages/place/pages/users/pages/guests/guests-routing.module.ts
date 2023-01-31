import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { GuestsPageSkeletonComponent } from "./components";
import { GUESTS_PAGE } from "./constants";
import { GuestsComponent } from "./layout/guests.component";
import { GuestsPageResolver } from "./resolvers";

export const GUESTS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: GuestsComponent,
		data: {
			animation: GUESTS_PAGE
		},
		resolve: {
			guests: GuestsPageResolver
		},
		skeleton: {
			component: GuestsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(GUESTS_ROUTES)],
	exports: [RouterModule]
})
export class GuestsRoutingModule {}
