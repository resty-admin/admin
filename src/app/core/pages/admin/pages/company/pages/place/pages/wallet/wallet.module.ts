import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TooltipModule } from "src/app/shared/ui/tooltip";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CardDialogModule } from "../../../../../../../../../features/cards/ui/card-dialog/card-dialog.module";
import { getI18nProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
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
		CardDialogModule
	],
	providers: [getI18nProvider("wallet", (lang) => import(`./i18n/${lang}.json`))]
})
export class WalletModule {}
