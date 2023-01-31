import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import {
	AccountingSystemDialogModule,
	AccountingSystemModule,
	AccountingSytemSkeletonModule
} from "@features/accounting-systems";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { ListSkeletonModule } from "@shared/ui/list-skeleton";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { AccountingSystemsRoutingModule } from "./accounting-systems-routing.module";
import { ACCOUNTING_SYSTEMS_COMPONENTS } from "./components";
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
		ListModule,
		AccountingSystemDialogModule,
		AccountingSystemModule,
		AccountingSytemSkeletonModule,
		SkeletonModule,
		FiltersSkeletonModule,
		ListSkeletonModule
	],
	providers: ACCOUNTING_SYSTEMS_PROVIDERS
})
export class AccountingSystemsModule {}
