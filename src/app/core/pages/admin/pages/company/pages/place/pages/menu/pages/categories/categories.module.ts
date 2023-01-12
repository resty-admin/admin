import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TippyDirective } from "@ngneat/helipopper";
import { ButtonModule } from "src/app/shared/ui/button";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CategoryDialogModule } from "../../../../../../../../../../../features/categories/ui/category-dialog/category-dialog.module";
import { ProductDialogModule } from "../../../../../../../../../../../features/products/ui/product-dialog/product-dialog.module";
import { getI18nProvider } from "../../../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { FiltersModule } from "../../../../../../../../../../../shared/ui/filters";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CATEGORIES_PAGE_I18N } from "./constants";
import { CategoriesComponent } from "./layout/categories.component";

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
	providers: [getI18nProvider(CATEGORIES_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class CategoriesModule {}
