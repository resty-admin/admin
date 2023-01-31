import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { AttributesPageSkeletonComponent } from "./components";
import { AttributesComponent } from "./layout/attributes.component";
import { AttriburesPageResolver } from "./resolvers";

export const ATTRIBUTES_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: AttributesComponent,
		data: {
			animation: "attributesPage"
		},
		resolve: {
			attributeGroups: AttriburesPageResolver
		},
		skeleton: {
			component: AttributesPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ATTRIBUTES_ROUTES)],
	exports: [RouterModule]
})
export class AttributesRoutingModule {}
