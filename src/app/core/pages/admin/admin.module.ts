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

import { ActionsModule } from "../../../shared/ui/actions";
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
		PipesModule
		// TooltipModule,
	],
	exports: [AdminComponent]
})
export class AdminModule {}
