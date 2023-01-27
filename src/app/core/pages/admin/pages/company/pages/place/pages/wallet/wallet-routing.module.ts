import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { WalletSkeletonComponent } from "./components";
import { WALLET_PAGE } from "./constants";
import { WalletComponent } from "./layout/wallet.component";
import { WalletResolver } from "./resolvers";

export const WALLET_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: WalletComponent,
		data: {
			animation: WALLET_PAGE
		},
		resolve: {
			places: WalletResolver
		},
		skeleton: {
			component: WalletSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(WALLET_ROUTES)],
	exports: [RouterModule]
})
export class WalletRoutingModule {}
