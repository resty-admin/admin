import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AttributeGroupDialogModule } from "@features/attributes";
import { CategoryDialogModule } from "@features/categories";
import { ProductDialogModule } from "@features/products";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { DatatableSkeletonModule } from "@shared/ui/datatable-skeleton";
import { FileModule } from "@shared/ui/file";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { MoreModule } from "@shared/ui/more";
import { SelectModule } from "@shared/ui/select";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsSkeletonModule } from "@shared/ui/tabs-skeleton";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

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
		AttributeGroupDialogModule,
		SkeletonModule,
		FiltersSkeletonModule,
		DatatableSkeletonModule,
		TabsSkeletonModule,
		MoreModule
	]
})
export class ProductsModule {}
