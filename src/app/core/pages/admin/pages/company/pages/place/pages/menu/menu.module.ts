import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { DatepickerModule } from "@shared/ui/datepicker";
import { FileModule } from "@shared/ui/file";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { MultipleCheckboxModule } from "@shared/ui/multiple-checkbox";
import { RadioButtonModule } from "@shared/ui/radio-button";
import { SelectModule } from "@shared/ui/select";
import { TabsModule } from "@shared/ui/tabs";
import { TypographyModule } from "@shared/ui/typography";

import { MenuComponent } from "./layout/menu.component";
import { MenuRoutingModule } from "./menu-routing.module";
import { MENU_PROVIDERS } from "./providers";

@NgModule({
	declarations: [MenuComponent],
	imports: [
		CommonModule,
		MenuRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		FileModule,
		RadioButtonModule,
		SelectModule,
		IconModule,
		DatepickerModule,
		MultipleCheckboxModule,
		I18nModule,
		TabsModule
	],
	providers: MENU_PROVIDERS
})
export class MenuModule {}
