import { NgModule } from "@angular/core";

import { PRODUCTS_COMPONENTS } from "./components";

@NgModule({
	declarations: PRODUCTS_COMPONENTS,
	exports: PRODUCTS_COMPONENTS
})
export class ProductsModule {}
