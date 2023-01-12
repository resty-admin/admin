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
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { SIGN_UP_PAGE_I18N } from "./constants";
import { SignUpComponent } from "./layout/sign-up.component";
import { SignUpRoutingModule } from "./sign-up-routing.module";

@NgModule({
	declarations: [SignUpComponent],
	imports: [
		CommonModule,
		SignUpRoutingModule,
		ReactiveFormsModule,
		I18nModule,
		TypographyModule,
		InputModule,
		RadioButtonModule,
		ButtonModule,
		LinkModule,
		CardModule,
		ImageModule,
		IconModule,
		SelectModule
	],
	providers: [getI18nProvider(SIGN_UP_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`)), getI18nProvider("form")]
})
export class SignUpModule {}
