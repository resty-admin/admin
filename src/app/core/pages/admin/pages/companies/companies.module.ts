import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/shared/modules/pipes";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";

import { CompaniesRoutingModule } from "./companies-routing.module";
import { COMPANIES_COMPONENTS } from "./components";
import { CompaniesComponent } from "./layout/companies.component";

@NgModule({
	declarations: [CompaniesComponent, ...COMPANIES_COMPONENTS],
	imports: [
		CommonModule,
		CompaniesRoutingModule,
		ReactiveFormsModule,
		ImageModule,
		IconModule,
		InputModule,
		FileModule,
		PipesModule
	],
	exports: [CompaniesComponent]
})
export class CompaniesModule {}
