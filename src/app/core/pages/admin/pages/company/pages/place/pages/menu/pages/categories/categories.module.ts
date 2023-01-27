import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CategoryDialogModule } from "@features/categories/ui";
import { ProductDialogModule } from "@features/products/ui";
import { TippyDirective } from "@ngneat/helipopper";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { DatatableSkeletonModule } from "@shared/ui/datatable-skeleton";
import { FileModule } from "@shared/ui/file";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsSkeletonModule } from "@shared/ui/tabs-skeleton";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { CATEGORIES_COMPONENTS } from "./components";
import { CategoriesComponent } from "./layout/categories.component";
import { CATEGORIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CategoriesComponent, ...CATEGORIES_COMPONENTS],
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
		ProductDialogModule,
		SkeletonModule,
		FiltersSkeletonModule,
		TabsSkeletonModule,
		DatatableSkeletonModule
	],
	providers: CATEGORIES_PROVIDERS
})
export class CategoriesModule {}
