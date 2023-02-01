import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ContractComponent } from "./layout/contract.component";

export const CONTRACT_ROUTES: Route[] = [
	{
		path: "",
		component: ContractComponent,
		data: {
			animation: "contractPage"
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(CONTRACT_ROUTES)],
	exports: [RouterModule]
})
export class ContractRoutingModule {}
