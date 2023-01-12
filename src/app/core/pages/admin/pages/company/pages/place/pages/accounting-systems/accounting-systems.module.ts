import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
import { AccountingSystemsRoutingModule } from "./accounting-systems-routing.module";
import { ACCOUNTING_SYSTEMS_COMPONENTS, AccountingSystemComponent } from "./components";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";
import { ACCOUNTING_SYSTEMS_PROVIDERS } from "./providers";

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
	providers: ACCOUNTING_SYSTEMS_PROVIDERS
})
export class AccountingSystemsModule {}
