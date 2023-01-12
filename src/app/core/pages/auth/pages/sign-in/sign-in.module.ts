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

import { SignInComponent } from "./layout/sign-in.component";
import { SIGN_IN_PROVIDERS } from "./providers";
import { SignInRoutingModule } from "./sign-in-routing.module";

@NgModule({
	declarations: [SignInComponent],
	imports: [
		CommonModule,
		SignInRoutingModule,
		ReactiveFormsModule,
		I18nModule,
		TypographyModule,
		InputModule,
		RadioButtonModule,
		ButtonModule,
		LinkModule,
		IconModule,
		ImageModule,
		CardModule
	],
	providers: SIGN_IN_PROVIDERS
})
export class SignInModule {}
