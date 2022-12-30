import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AccountingSystemFeatureModule } from "src/app/features/accounting-systems";
import { ButtonModule } from "src/app/shared/ui/button";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { AccountingSystemsRoutingModule } from "./accounting-systems-routing.module";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";

@NgModule({
	declarations: [AccountingSystemsComponent],
	imports: [
		CommonModule,
		AccountingSystemsRoutingModule,
		TypographyModule,
		ButtonModule,
		InputModule,
		AccountingSystemFeatureModule
	]
})
export class AccountingSystemsModule {}
