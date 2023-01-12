import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "src/app/shared/modules/pipes";

import { CompanyDialogModule } from "../../../../../features/companies/ui/company-dialog/company-dialog.module";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { IconModule } from "../../../../../shared/ui/icon";
import { ImageModule } from "../../../../../shared/ui/image";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { CompaniesRoutingModule } from "./companies-routing.module";
import { CompaniesComponent } from "./layout/companies.component";
import { COMPANIES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [CompaniesComponent],
	imports: [
		CommonModule,
		CompaniesRoutingModule,
		IconModule,
		ImageModule,
		PipesModule,
		TypographyModule,
		CompanyDialogModule,
		I18nModule
	],
	providers: COMPANIES_PROVIDERS
})
export class CompaniesModule {}
