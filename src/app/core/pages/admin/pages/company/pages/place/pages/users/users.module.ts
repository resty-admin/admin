import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { InputModule } from "src/app/shared/ui/input";
import { SelectModule } from "src/app/shared/ui/select";
import { TypographyModule } from "src/app/shared/ui/typography";

import { UserDialogModule } from "../../../../../../../../../features/users/ui/user-dialog/user-dialog.module";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { AddHeaderModule } from "../../../../../../../../../shared/ui/add-header";
import { TabsModule } from "../../../../../../../../../shared/ui/tabs";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { UsersComponent } from "./layout/users.component";
import { USERS_PROVIDERS } from "./providers";
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
		TranslocoModule,
		AddHeaderModule,
		TabsModule,
		UserDialogModule
	],
	providers: USERS_PROVIDERS
})
export class UsersModule {}
