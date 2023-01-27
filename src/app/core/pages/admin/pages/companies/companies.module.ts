import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CompanyDialogModule } from "@features/companies/ui/company-dialog/company-dialog.module";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { CompaniesRoutingModule } from "./companies-routing.module";
import { COMPANIES_COMPONENTS } from "./components";
import { CompaniesComponent } from "./layout/companies.component";
import { COMPANIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CompaniesComponent, ...COMPANIES_COMPONENTS],
	imports: [
		CommonModule,
		CompaniesRoutingModule,
		IconModule,
		ImageModule,
		PipesModule,
		TypographyModule,
		CompanyDialogModule,
		I18nModule,
		SkeletonModule
	],
	providers: COMPANIES_PROVIDERS
})
export class CompaniesModule {}
