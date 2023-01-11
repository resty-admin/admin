import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "src/app/shared/modules/directives";
import { PipesModule } from "src/app/shared/modules/pipes";
import { ThemeModule } from "src/app/shared/modules/theme";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { LanguageSelectModule } from "src/app/shared/ui/language-select";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { CompanyDialogModule } from "../../../features/companies/ui/company-dialog/company-dialog.module";
import { PlaceDialogModule } from "../../../features/places/ui/place-dialog/place-dialog.module";
import { I18nModule } from "../../../shared/modules/i18n";
import { ActionsModule } from "../../../shared/ui/actions";
import { LinkModule } from "../../../shared/ui/link";
import { TooltipModule } from "../../../shared/ui/tooltip";
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
		PlaceDialogModule
	]
})
export class AdminModule {}
