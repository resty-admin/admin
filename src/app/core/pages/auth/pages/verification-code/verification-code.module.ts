import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CardModule } from "@shared/ui/card";
import { CodeInputModule } from "@shared/ui/code-input";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { VerificationCodeComponent } from "./layout/verification-code.component";
import { VERIFICATION_CODE_PROVIDERS } from "./providers";
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
	providers: VERIFICATION_CODE_PROVIDERS
})
export class VerificationCodeModule {}
