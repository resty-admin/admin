import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TablesFeatureModule } from "src/app/features/tables";
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
import { TablesComponent } from "./layout/tables.component";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [
		CommonModule,
		TablesRoutingModule,
		InputModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		ActionsModule,
		TooltipModule,
		TablesFeatureModule,
		TranslocoModule
	],
	providers: [getScopeProvider("tables", (lang) => import(`./i18n/${lang}.json`))]
})
export class TablesModule {}
