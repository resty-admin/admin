import { NgModule } from "@angular/core";

import { COMPANIES_COMPONENTS } from "./components";

@NgModule({
	declarations: COMPANIES_COMPONENTS,
	exports: COMPANIES_COMPONENTS
})
export class CompaniesModule {}
