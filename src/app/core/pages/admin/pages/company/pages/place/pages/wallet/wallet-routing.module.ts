import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { WalletComponent } from "./layout/wallet.component";

export const WALLET_ROUTES: Route[] = [
	{
		path: "",
		component: WalletComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(WALLET_ROUTES)],
	exports: [RouterModule]
})
export class WalletRoutingModule {}
