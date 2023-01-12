import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "src/app/shared/modules/pipes";

import { CompanyDialogModule } from "../../../../../features/companies/ui/company-dialog/company-dialog.module";
import { getI18nProvider } from "../../../../../shared/i18n";
import { I18nModule } from "../../../../../shared/modules/i18n";
import { IconModule } from "../../../../../shared/ui/icon";
import { ImageModule } from "../../../../../shared/ui/image";
import { TypographyModule } from "../../../../../shared/ui/typography";
import { CompaniesRoutingModule } from "./companies-routing.module";
import { COMPANIES_PAGE_I18N } from "./constants/companies-page-i18n.constant";
import { CompaniesComponent } from "./layout/companies.component";

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
	providers: [getI18nProvider(COMPANIES_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class CompaniesModule {}
