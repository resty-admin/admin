import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "src/app/shared/modules/i18n";
import { ButtonModule } from "src/app/shared/ui/button";
import { CardModule } from "src/app/shared/ui/card";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { LinkModule } from "src/app/shared/ui/link";
import { RadioButtonModule } from "src/app/shared/ui/radio-button";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { ForgotPasswordComponent } from "./layout/forgot-password.component";

@NgModule({
	declarations: [ForgotPasswordComponent],
	imports: [
		CommonModule,
		ForgotPasswordRoutingModule,
		ReactiveFormsModule,
		I18nModule,
		TypographyModule,
		InputModule,
		RadioButtonModule,
		ButtonModule,
		LinkModule,
		CardModule,
		ImageModule,
		IconModule
	],
	providers: [getI18nProvider("forgotPassword", (lang) => import(`./i18n/${lang}.json`)), getI18nProvider("form")]
})
export class ForgotPasswordModule {}
