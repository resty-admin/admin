import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { AccountingSystemsPageSkeletonComponent } from "./components";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";
import { AccountingSystemsPageResolver } from "./resolvers";

export const ACCOUNTING_SYSTEMS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: AccountingSystemsComponent,
		data: {
			animation: "accountingSystemPage"
		},
		resolve: {
			accountingSystems: AccountingSystemsPageResolver
		},
		skeleton: {
			component: AccountingSystemsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACCOUNTING_SYSTEMS_ROUTES)],
	exports: [RouterModule]
})
export class AccountingSystemsRoutingModule {}
