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
import { RadioButtonModule } from "@shared/ui/radio-button";
import { TypographyModule } from "@shared/ui/typography";

import { SignInComponent } from "./layout/sign-in.component";
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
	]
})
export class SignInModule {}
