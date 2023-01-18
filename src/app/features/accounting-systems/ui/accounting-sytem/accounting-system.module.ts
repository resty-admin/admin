import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { TypographyModule } from "../../../../shared/ui/typography";
import { AccountingSystemComponent } from "./layout/accounting-system.component";

@NgModule({
	declarations: [AccountingSystemComponent],
	imports: [CommonModule, TypographyModule],
	exports: [AccountingSystemComponent]
})
export class AccountingSystemModule {}
