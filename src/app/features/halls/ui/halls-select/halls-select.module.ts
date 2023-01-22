import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";

import { HallsSelectComponent } from "./layout/halls-select.component";
import { HALLS_SELECT_PROVIDERS } from "./providers";

@NgModule({
	declarations: [HallsSelectComponent],
	imports: [CommonModule, FormsModule, I18nModule],
	providers: HALLS_SELECT_PROVIDERS,
	exports: [HallsSelectComponent]
})
export class HallsSelectModule {}
