import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { WALLET_COMPONENTS } from "./components";
import { WalletComponent } from "./layout/wallet.component";
import { WalletRoutingModule } from "./wallet-routing.module";

@NgModule({
	declarations: [WalletComponent, ...WALLET_COMPONENTS],
	imports: [
		CommonModule,
		WalletRoutingModule,
		TypographyModule,
		IconModule,
		ButtonModule,
		ReactiveFormsModule,
		InputModule,
		ImageModule,
		TooltipModule,
		ActionsModule,
		TranslocoModule,
		SkeletonModule
	]
})
export class WalletModule {}
