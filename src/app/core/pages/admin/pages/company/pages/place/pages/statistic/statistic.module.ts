import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

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
		I18nModule,
		SkeletonModule
	],
	providers: STATISTIC_PROVIDERS
})
export class StatisticModule {}
