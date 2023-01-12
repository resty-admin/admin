import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { HALL_PAGE_I18N } from "./constants";
import { HallRoutingModule } from "./hall-routing.module";
import { HallComponent } from "./layout/hall.component";

@NgModule({
	declarations: [HallComponent],
	imports: [CommonModule, HallRoutingModule, TranslocoModule],
	exports: [HallComponent],
	providers: [getI18nProvider(HALL_PAGE_I18N, (lang) => import(`../i18n/${lang}.json`))]
})
export class HallModule {}
