import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { AccountingSystemsSkeletonComponent } from "./components";
import { ACCOUNTING_SYSTEMS_PAGE } from "./constants";
import { AccountingSystemsComponent } from "./layout/accounting-systems.component";
import { AccountingSystemsResolver } from "./resolvers";

export const ACCOUNTING_SYSTEMS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: AccountingSystemsComponent,
		data: {
			animation: ACCOUNTING_SYSTEMS_PAGE
		},
		resolve: {
			accountingSystems: AccountingSystemsResolver
		},
		skeleton: {
			component: AccountingSystemsSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACCOUNTING_SYSTEMS_ROUTES)],
	exports: [RouterModule]
})
export class AccountingSystemsRoutingModule {}
