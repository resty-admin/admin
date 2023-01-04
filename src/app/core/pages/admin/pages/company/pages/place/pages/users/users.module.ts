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

import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { UsersComponent } from "./layout/users.component";
import { UserRoutingModule } from "./users-routing.module";

@NgModule({
	declarations: [UsersComponent],
	imports: [
		CommonModule,
		UserRoutingModule,
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
	exports: [UsersComponent]
})
export class UsersModule {}
