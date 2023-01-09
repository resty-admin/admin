import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DirectivesModule } from "src/app/shared/modules/directives";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getScopeProvider } from "../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { HallsRoutingModule } from "./halls-routing.module";
import { HallsComponent } from "./layout/halls.component";

@NgModule({
	declarations: [HallsComponent],
	imports: [
		CommonModule,
		HallsRoutingModule,
		InputModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		ActionsModule,
		TooltipModule,
		DirectivesModule,
		TranslocoModule
	],
	providers: [getScopeProvider("halls", (lang) => import(`./i18n/${lang}.json`))]
})
export class HallsModule {}
