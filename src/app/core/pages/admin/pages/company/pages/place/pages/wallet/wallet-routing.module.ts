import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { WalletPageSkeletonComponent } from "./components";
import { WalletComponent } from "./layout/wallet.component";
import { WalletPageResolver } from "./resolvers";

export const WALLET_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: WalletComponent,
		data: {
			animation: "walletPage"
		},
		resolve: {
			places: WalletPageResolver
		},
		skeleton: {
			component: WalletPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(WALLET_ROUTES)],
	exports: [RouterModule]
})
export class WalletRoutingModule {}
