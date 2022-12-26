import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { AttributesComponent } from "./layout/attributes.component";

export const ATTRIBUTES_ROUTES: Route[] = [
	{
		path: "",
		component: AttributesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ATTRIBUTES_ROUTES)],
	exports: [RouterModule]
})
export class AttributesRoutingModule {}
