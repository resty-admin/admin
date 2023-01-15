import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { I18nModule } from "../../../../../../../../../shared/modules/i18n";
import { STATISTIC_COMPONENTS } from "./components";
import { StatisticComponent } from "./layout/statistic.component";
import { STATISTIC_PROVIDERS } from "./providers";
import { StatisticRoutingModule } from "./statistic-routing.module";

@NgModule({
	declarations: [StatisticComponent, ...STATISTIC_COMPONENTS],
	imports: [
		CommonModule,
		StatisticRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		I18nModule
	],
	providers: STATISTIC_PROVIDERS
})
export class StatisticModule {}
