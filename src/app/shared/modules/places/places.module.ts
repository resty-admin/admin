import { NgModule } from "@angular/core";

import { PLACES_COMPONENTS } from "./components";

@NgModule({
	declarations: PLACES_COMPONENTS,
	exports: PLACES_COMPONENTS
})
export class PlacesModule {}
