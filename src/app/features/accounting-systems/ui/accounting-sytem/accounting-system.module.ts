import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AccountingSystemComponent } from "./layout/accounting-system.component";

@NgModule({
	declarations: [AccountingSystemComponent],
	imports: [CommonModule],
	exports: [AccountingSystemComponent]
})
export class AccountingSystemModule {}
