import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { UserDialogModule } from "../../../../../../../../../../../features/users/ui/user-dialog/user-dialog.module";
import { TranslocoModule } from "../../../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { FiltersModule } from "../../../../../../../../../../../shared/ui/filters";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { WorkersComponent } from "./layout/workers.component";
import { WORKERS_PROVIDERS } from "./providers";
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
		TranslocoModule,
		FiltersModule,
		UserDialogModule
	],
	providers: WORKERS_PROVIDERS
})
export class WorkersModule {}
