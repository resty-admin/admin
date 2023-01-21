import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoryDialogModule } from "@features/categories/ui/category-dialog/category-dialog.module";
import { ProductDialogModule } from "@features/products/ui/product-dialog/product-dialog.module";
import { TippyDirective } from "@ngneat/helipopper";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { FileModule } from "@shared/ui/file";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./layout/categories.component";
import { CATEGORIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CategoriesComponent],
	imports: [
		CommonModule,
		CategoriesRoutingModule,
		ButtonModule,
		InputModule,
		SelectModule,
		FileModule,
		ImageModule,
		IconModule,
		TypographyModule,
		TooltipModule,
		ActionsModule,
		TippyDirective,
		TranslocoModule,
		FiltersModule,
		CategoryDialogModule,
		ProductDialogModule
	],
	providers: CATEGORIES_PROVIDERS
})
export class CategoriesModule {}
