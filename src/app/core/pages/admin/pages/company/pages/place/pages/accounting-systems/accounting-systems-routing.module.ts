import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { AccountingSystemsComponent } from "./layout/accounting-systems.component";

export const ACCOUNTING_SYSTEMS_ROUTES: Route[] = [
	{
		path: "",
		component: AccountingSystemsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACCOUNTING_SYSTEMS_ROUTES)],
	exports: [RouterModule]
})
export class AccountingSystemsRoutingModule {}
