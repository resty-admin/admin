import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CompanyDialogModule } from "@features/companies";
import { PlaceDialogModule } from "@features/places/ui/place-dialog/place-dialog.module";
import { DirectivesModule } from "@shared/modules/directives";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ThemeModule } from "@shared/modules/theme";
import { ActionsModule } from "@shared/ui/actions";
import { ActiveOrderModule } from "@shared/ui/active-order";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { LanguageSelectModule } from "@shared/ui/language-select";
import { LinkModule } from "@shared/ui/link";
import { SelectModule } from "@shared/ui/select";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { AdminRoutingModule } from "./admin-routing.module";
import { ADMIN_COMPONENTS } from "./components";
import { AdminComponent } from "./layout/admin.component";

@NgModule({
	declarations: [AdminComponent, ...ADMIN_COMPONENTS],
	imports: [
		CommonModule,
		AdminRoutingModule,
		IconModule,
		ImageModule,
		ButtonModule,
		ThemeModule,
		SelectModule,
		LanguageSelectModule,
		TypographyModule,
		ReactiveFormsModule,
		ActionsModule,
		DirectivesModule,
		PipesModule,
		TooltipModule,
		LinkModule,
		I18nModule,
		CompanyDialogModule,
		PlaceDialogModule,
		ActiveOrderModule
	]
})
export class AdminModule {}
