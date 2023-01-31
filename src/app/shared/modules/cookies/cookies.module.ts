import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IconModule } from "@shared/ui/icon";

import { COOKIES_COMPONENTS } from "./components";
import { CookiesComponent } from "./layout/cookies.component";

@NgModule({
	declarations: [CookiesComponent, ...COOKIES_COMPONENTS],
	imports: [CommonModule, IconModule],
	exports: [CookiesComponent, ...COOKIES_COMPONENTS]
})
export class CookiesModule {}
