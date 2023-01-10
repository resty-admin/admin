import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../../../../../shared/i18n";
import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
import { AccountingSystemsRoutingModule } from "./accounting-systems-routing.module";
import { ACCOUNTING_SYSTEMS_COMPONENTS, AccountingSystemComponent } from "./components";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";

@NgModule({
	declarations: [AccountingSystemsComponent, ...ACCOUNTING_SYSTEMS_COMPONENTS],
	imports: [
		CommonModule,
		AccountingSystemsRoutingModule,
		ReactiveFormsModule,
		TypographyModule,
		ButtonModule,
		InputModule,
		I18nModule,
		FiltersModule,
		ListModule
	],
	exports: [AccountingSystemComponent],
	providers: [getI18nProvider("accountingSystems", (lang) => import(`./i18n/${lang}.json`))]
})
export class AccountingSystemsModule {}
