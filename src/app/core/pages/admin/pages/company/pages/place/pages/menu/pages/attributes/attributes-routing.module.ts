import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { AttributesSkeletonComponent } from "./components";
import { ATTRIBUTES_PAGE } from "./constants";
import { AttributesComponent } from "./layout/attributes.component";
import { AttriburesResolver } from "./resolvers";

export const ATTRIBUTES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: AttributesComponent,
		data: {
			animation: ATTRIBUTES_PAGE
		},
		resolve: {
			places: AttriburesResolver
		},
		skeleton: {
			component: AttributesSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ATTRIBUTES_ROUTES)],
	exports: [RouterModule]
})
export class AttributesRoutingModule {}
