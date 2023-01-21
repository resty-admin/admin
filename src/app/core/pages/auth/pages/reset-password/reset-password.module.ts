import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CardModule } from "@shared/ui/card";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { LinkModule } from "@shared/ui/link";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { TypographyModule } from "@shared/ui/typography";

import { ResetPasswordComponent } from "./layout/reset-password.component";
import { RESET_PASSWORD_PROVIDERS } from "./providers";
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";

@NgModule({
	declarations: [ResetPasswordComponent],
	imports: [
		CommonModule,
		ResetPasswordRoutingModule,
		ReactiveFormsModule,
		I18nModule,
		TypographyModule,
		InputModule,
		RadioButtonModule,
		ButtonModule,
		LinkModule,
		CardModule,
		ImageModule
	],
	providers: RESET_PASSWORD_PROVIDERS
})
export class ResetPasswordModule {}
