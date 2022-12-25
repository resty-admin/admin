import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TippyDirective } from "@ngneat/helipopper";
import { ButtonModule } from "src/app/shared/ui/button";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ActionsModule } from "../../../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../../../shared/ui/tooltip";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CATEGORIES_COMPONENTS } from "./components";
import { CategoriesComponent } from "./layout/categories.component";

@NgModule({
	declarations: [CategoriesComponent, ...CATEGORIES_COMPONENTS],
	imports: [
		CommonModule,
		CategoriesRoutingModule,
		ButtonModule,
		InputModule,
		SelectModule,
		FileModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule,
		TypographyModule,
		TooltipModule,
		ActionsModule,
		TippyDirective
	],
	exports: [CategoriesComponent]
})
export class CategoriesModule {}
