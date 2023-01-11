import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "src/app/shared/modules/i18n";
import { ThemeModule } from "src/app/shared/modules/theme";
import { ImageModule } from "src/app/shared/ui/image";
import { LanguageSelectModule } from "src/app/shared/ui/language-select";

import { AUTH_GUARDS } from "../../../features/auth/guards";
import { getI18nProvider } from "../../../shared/i18n";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./layout/auth.component";

@NgModule({
	declarations: [AuthComponent],
	imports: [CommonModule, AuthRoutingModule, I18nModule, ImageModule, ThemeModule, LanguageSelectModule],
	providers: [AUTH_GUARDS, getI18nProvider("auth", (lang) => import(`./i18n/${lang}.json`))]
})
export class AuthModule {}
