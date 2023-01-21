import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AttributeGroupDialogModule } from "@features/attributes";
import { CategoryDialogModule } from "@features/categories";
import { ProductDialogModule } from "@features/products";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FileModule } from "@shared/ui/file";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { PRODUCTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [ProductsComponent],
	imports: [
		CommonModule,
		ProductsRoutingModule,
		ButtonModule,
		InputModule,
		SelectModule,
		FileModule,
		IconModule,
		ImageModule,
		TypographyModule,
		DatatableModule,
		ActionsModule,
		TooltipModule,
		TranslocoModule,
		FiltersModule,
		ProductDialogModule,
		CategoryDialogModule,
		AttributeGroupDialogModule
	],
	providers: PRODUCTS_PROVIDERS
})
export class ProductsModule {}
