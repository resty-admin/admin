import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserDialogModule } from "@features/users/ui/user-dialog/user-dialog.module";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { GUESTS_COMPONENTS } from "./components";
import { GuestsRoutingModule } from "./guests-routing.module";
import { GuestsComponent } from "./layout/guests.component";
import { GUESTS_PROVIDERS } from "./providers";

@NgModule({
	declarations: [GuestsComponent, ...GUESTS_COMPONENTS],
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
