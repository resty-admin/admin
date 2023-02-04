import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { I18nModule } from "@shared/modules/i18n";
import { IconModule } from "@shared/ui/icon";

import { COOKIES_COMPONENTS } from "./components";
import { CookiesComponent } from "./layout/cookies.component";

@NgModule({
	declarations: [CookiesComponent, ...COOKIES_COMPONENTS],
	imports: [CommonModule, IconModule, I18nModule],
	exports: [CookiesComponent, ...COOKIES_COMPONENTS]
})
export class CookiesModule {}
