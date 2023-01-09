import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UsersFeatureModule } from "src/app/features/users";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { getScopeProvider } from "../../../../../../../../../../../shared/i18n";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { WorkersComponent } from "./layout/workers.component";
import { WorkersRoutingModule } from "./workers-routing.module";

@NgModule({
	declarations: [WorkersComponent],
	imports: [
		CommonModule,
		WorkersRoutingModule,
		InputModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		SelectModule,
		FormsModule,
		ActionsModule,
		TooltipModule,
		UsersFeatureModule,
		TranslocoModule
	],
	providers: [getScopeProvider("workers", (lang) => import(`./i18n/${lang}.json`))]
})
export class WorkersModule {}
