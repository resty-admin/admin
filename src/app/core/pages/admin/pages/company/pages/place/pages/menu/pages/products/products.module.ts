import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { PRODUCTS_COMPONENTS } from "./components";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

@NgModule({
	declarations: [ProductsComponent, ...PRODUCTS_COMPONENTS],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		ButtonModule,
		InputModule,
		SelectModule,
		FileModule,
		ReactiveFormsModule,
		IconModule,
		ImageModule,
		TypographyModule,
		DatatableModule,
		ActionsModule,
		TooltipModule
	],
	exports: [ProductsComponent]
})
export class ProductsModule {}
