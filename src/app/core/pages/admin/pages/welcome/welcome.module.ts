import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { InputModule } from "@shared/ui/input";
import { TypographyModule } from "@shared/ui/typography";

import { WelcomeComponent } from "./layout/welcome.component";
import { WELCOME_PROVIDERS } from "./providers";
import { WelcomeRoutingModule } from "./welcome-routing.module";

@NgModule({
	declarations: [WelcomeComponent],
	imports: [
		CommonModule,
		WelcomeRoutingModule,
		TypographyModule,
		InputModule,
		ReactiveFormsModule,
		I18nModule,
		ButtonModule
	],
	providers: WELCOME_PROVIDERS
})
export class WelcomeModule {}
