import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AccountingSystemModule } from "@features/accounting-systems";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { FiltersModule } from "@shared/ui/filters";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { TypographyModule } from "@shared/ui/typography";

import { AccountingSystemsRoutingModule } from "./accounting-systems-routing.module";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";
import { ACCOUNTING_SYSTEMS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [AccountingSystemsComponent],
	imports: [
		CommonModule,
		AccountingSystemsRoutingModule,
		ReactiveFormsModule,
		TypographyModule,
		ButtonModule,
		InputModule,
		I18nModule,
		FiltersModule,
		ListModule,
		AccountingSystemModule
	],
	providers: ACCOUNTING_SYSTEMS_PROVIDERS
})
export class AccountingSystemsModule {}
