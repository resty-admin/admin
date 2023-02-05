import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PRODUCT_COMPONENTS } from "./components";
import { ProductComponent } from "./layout/product.component";
import { ProductRoutingModule } from "./product-routing.module";

@NgModule({
	declarations: [ProductComponent, ...PRODUCT_COMPONENTS],
	imports: [CommonModule, ProductRoutingModule]
})
export class ProductModule {}
