import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CardModule } from "@shared/ui/card";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { LinkModule } from "@shared/ui/link";
import { LoginWithTelegramModule } from "@shared/ui/login-with-telegram";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { SelectModule } from "@shared/ui/select";
import { TypographyModule } from "@shared/ui/typography";

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
		SelectModule,
		LoginWithTelegramModule
	]
})
export class SignUpModule {}
