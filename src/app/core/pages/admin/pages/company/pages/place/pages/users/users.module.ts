import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { USERS_COMPONENTS } from "./components";
import { UsersComponent } from "./layout/users.component";
import { UserRoutingModule } from "./users-routing.module";

@NgModule({
	declarations: [UsersComponent, ...USERS_COMPONENTS],
	imports: [
		CommonModule,
		UserRoutingModule,
		InputModule,
		ReactiveFormsModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		SelectModule,
		FormsModule,
		ActionsModule,
		TooltipModule
	],
	exports: [UsersComponent]
})
export class UsersModule {}
