import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CardsFeatureModule } from "../../../../../../../../../features/cards/cards.feature.module";
import { getScopeProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { WalletComponent } from "./layout/wallet.component";
import { WalletRoutingModule } from "./wallet-routing.module";

@NgModule({
	declarations: [WalletComponent],
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
		CardsFeatureModule
	],
	providers: [getScopeProvider("wallet", (lang) => import(`./i18n/${lang}.json`))]
})
export class WalletModule {}
