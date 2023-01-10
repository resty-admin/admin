import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { HallRoutingModule } from "./hall-routing.module";
import { HallComponent } from "./layout/hall.component";

@NgModule({
	declarations: [HallComponent],
	imports: [CommonModule, HallRoutingModule, TranslocoModule],
	exports: [HallComponent],
	providers: [getI18nProvider("hall", (lang) => import(`./i18n/${lang}.json`))]
})
export class HallModule {}
