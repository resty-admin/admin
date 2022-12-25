import { NgModule } from "@angular/core";

import { CATEGORIES_COMPONENTS } from "./components";

@NgModule({
	declarations: CATEGORIES_COMPONENTS,
	exports: CATEGORIES_COMPONENTS
})
export class CategoriesModule {}
