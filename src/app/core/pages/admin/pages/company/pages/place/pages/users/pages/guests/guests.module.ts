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
import { GuestsRoutingModule } from "./guests-routing.module";
import { GuestsComponent } from "./layout/guests.component";
import { GUESTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [GuestsComponent],
	imports: [
		CommonModule,
		GuestsRoutingModule,
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
	providers: GUESTS_PROVIDERS
})
export class GuestsModule {}
