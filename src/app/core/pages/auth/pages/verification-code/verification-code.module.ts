import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "src/app/shared/modules/i18n";
import { CodeInputModule } from "src/app/shared/ui/code-input";
import { ImageModule } from "src/app/shared/ui/image";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getI18nProvider } from "../../../../../shared/i18n";
import { ButtonModule } from "../../../../../shared/ui/button";
import { CardModule } from "../../../../../shared/ui/card";
import { VERIFICATION_CODE_PAGE_I18N } from "./constants";
import { VerificationCodeComponent } from "./layout/verification-code.component";
import { VerificationCodeRoutingModule } from "./verification-code-routing.module";

@NgModule({
	declarations: [VerificationCodeComponent],
	imports: [
		CommonModule,
		VerificationCodeRoutingModule,
		I18nModule,
		CodeInputModule,
		TypographyModule,
		ImageModule,
		FormsModule,
		ReactiveFormsModule,
		CardModule,
		ButtonModule
	],
	providers: [getI18nProvider(VERIFICATION_CODE_PAGE_I18N, (lang) => import(`./i18n/${lang}.json`))]
})
export class VerificationCodeModule {}
