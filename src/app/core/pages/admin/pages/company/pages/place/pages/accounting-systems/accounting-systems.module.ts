import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { AccountingSystemModule } from "../../../../../../../../../features/accounting-systems";
import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
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
