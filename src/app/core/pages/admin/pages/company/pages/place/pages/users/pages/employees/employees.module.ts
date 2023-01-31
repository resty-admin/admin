import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserDialogModule } from "@features/users/ui/user-dialog/user-dialog.module";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { DatatableSkeletonModule } from "@shared/ui/datatable-skeleton";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { InputModule } from "@shared/ui/input";
import { MoreModule } from "@shared/ui/more";
import { SelectModule } from "@shared/ui/select";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsSkeletonModule } from "@shared/ui/tabs-skeleton";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { EMPLOYEES_COMPONENTS } from "./components";
import { EmployeesRoutingModule } from "./employees-routing.module";
import { EmployeesComponent } from "./layout/employees.component";
import { EMPLOYEES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [EmployeesComponent, ...EMPLOYEES_COMPONENTS],
	imports: [
		CommonModule,
		EmployeesRoutingModule,
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
		FiltersModule,
		UserDialogModule,
		SkeletonModule,
		TabsSkeletonModule,
		FiltersSkeletonModule,
		DatatableSkeletonModule,
		MoreModule
	],
	providers: EMPLOYEES_PROVIDERS
})
export class EmployeesModule {}
