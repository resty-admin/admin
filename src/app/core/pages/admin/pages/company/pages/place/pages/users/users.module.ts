import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserDialogModule } from "@features/users/ui/user-dialog/user-dialog.module";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddHeaderModule } from "@shared/ui/add-header";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { SelectModule } from "@shared/ui/select";
import { TabsModule } from "@shared/ui/tabs";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

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
		TranslocoModule,
		AddHeaderModule,
		TabsModule,
		UserDialogModule
	]
})
export class UsersModule {}
