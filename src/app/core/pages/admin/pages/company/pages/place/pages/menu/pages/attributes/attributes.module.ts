import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AttributeDialogModule } from "@features/attributes/ui/attribute-dialog/attribute-dialog.module";
import { AttributeGroupDialogModule } from "@features/attributes/ui/attribute-group-dialog/attribute-group-dialog.module";
import { TippyDirective } from "@ngneat/helipopper";
import { I18nModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddButtonModule } from "@shared/ui/add-button";
import { ButtonModule } from "@shared/ui/button";
import { DatatableSkeletonModule } from "@shared/ui/datatable-skeleton";
import { FileModule } from "@shared/ui/file";
import { FiltersModule } from "@shared/ui/filters";
import { FiltersSkeletonModule } from "@shared/ui/filters-skeleton";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { MoreModule } from "@shared/ui/more";
import { PagerModule } from "@shared/ui/pager";
import { SelectModule } from "@shared/ui/select";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TabsSkeletonModule } from "@shared/ui/tabs-skeleton";
import { ToggleModule } from "@shared/ui/toggle";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { AttributesRoutingModule } from "./attributes-routing.module";
import { ATTRIUTES_COMPONENTS } from "./components";
import { AttributesComponent } from "./layout/attributes.component";

@NgModule({
	declarations: [AttributesComponent, ATTRIUTES_COMPONENTS],
	imports: [
		CommonModule,
		AttributesRoutingModule,
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
		TippyDirective,
		ToggleModule,
		I18nModule,
		FiltersModule,
		AttributeDialogModule,
		AttributeGroupDialogModule,
		SkeletonModule,
		TabsSkeletonModule,
		FiltersSkeletonModule,
		DatatableSkeletonModule,
		MoreModule,
		AddButtonModule,
		PagerModule
	]
})
export class AttributesModule {}
