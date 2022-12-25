import { NgModule } from "@angular/core";

import { TABLES_COMPONENTS } from "./components";

@NgModule({
	declarations: TABLES_COMPONENTS,
	exports: TABLES_COMPONENTS
})
export class TablesModule {}
