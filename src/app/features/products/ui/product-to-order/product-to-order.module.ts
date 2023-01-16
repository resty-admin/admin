import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { IconModule } from "../../../../shared/ui/icon";
import { ImageModule } from "../../../../shared/ui/image";
import { ProductToOrderComponent } from "./layout/product-to-order.component";

@NgModule({
	declarations: [ProductToOrderComponent],
	imports: [CommonModule, ImageModule, IconModule],
	exports: [ProductToOrderComponent]
})
export class ProductToOrderModule {}
