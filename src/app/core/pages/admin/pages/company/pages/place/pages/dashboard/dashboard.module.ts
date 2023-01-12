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
import { DASHBOARD_COMPONENTS } from "./components";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./layout/dashboard.component";
import { DASHBOARD_PROVIDERS } from "./providers";

@NgModule({
	declarations: [DashboardComponent, ...DASHBOARD_COMPONENTS],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		I18nModule
	],
	providers: DASHBOARD_PROVIDERS
})
export class DashboardModule {}
