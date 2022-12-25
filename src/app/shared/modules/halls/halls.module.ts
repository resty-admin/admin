import { NgModule } from "@angular/core";

import { HALLS_COMPONENTS } from "./components";

@NgModule({
	declarations: HALLS_COMPONENTS,
	exports: HALLS_COMPONENTS
})
export class HallsModule {}
