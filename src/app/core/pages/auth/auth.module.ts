import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { ThemeModule } from "@shared/modules/theme";
import { ImageModule } from "@shared/ui/image";
import { LanguageSelectModule } from "@shared/ui/language-select";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./layout/auth.component";

@NgModule({
	declarations: [AuthComponent],
	imports: [CommonModule, AuthRoutingModule, I18nModule, ImageModule, ThemeModule, LanguageSelectModule]
})
export class AuthModule {}
