import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";

import { LoginWithTelegramComponent } from "./layout/login-with-telegram.component";

@NgModule({
	declarations: [LoginWithTelegramComponent],
	imports: [CommonModule, ButtonModule, IconModule, I18nModule],
	exports: [LoginWithTelegramComponent]
})
export class LoginWithTelegramModule {}
