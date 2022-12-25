import { NgModule } from "@angular/core";

import { ACCOUNTING_SYSTEMS_COMPONENTS } from "./components";

@NgModule({
	declarations: ACCOUNTING_SYSTEMS_COMPONENTS,
	exports: ACCOUNTING_SYSTEMS_COMPONENTS
})
export class AccountingSystemsModule {}
