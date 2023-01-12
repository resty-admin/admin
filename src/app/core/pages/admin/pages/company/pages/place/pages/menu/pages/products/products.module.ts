import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { AttributeGroupDialogModule } from "../../../../../../../../../../../features/attributes/ui/attribute-group-dialog/attribute-group-dialog.module";
import { CategoryDialogModule } from "../../../../../../../../../../../features/categories/ui/category-dialog/category-dialog.module";
import { ProductDialogModule } from "../../../../../../../../../../../features/products/ui/product-dialog/product-dialog.module";
import { getI18nProvider } from "../../../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { FiltersModule } from "../../../../../../../../../../../shared/ui/filters";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { PRODUCTS_PAGE_I18N } from "./constants";
import { ProductsComponent } from "./layout/products.component";
import { ProductsRoutingModule } from "./products-routing.module";

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
	providers: [getI18nProvider(PRODUCTS_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class ProductsModule {}
