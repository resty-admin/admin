import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "src/app/shared/ui/button";
import { DatatableModule } from "src/app/shared/ui/datatable";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";
import { TypographyModule } from "src/app/shared/ui/typography";

import { TableModule } from "../../../../../../../../../features/tables";
import { TableDialogModule } from "../../../../../../../../../features/tables/ui/table-dialog/table-dialog.module";
import { TranslocoModule } from "../../../../../../../../../shared/modules/i18n";
import { ActionsModule } from "../../../../../../../../../shared/ui/actions";
import { AddHeaderModule } from "../../../../../../../../../shared/ui/add-header";
import { FiltersModule } from "../../../../../../../../../shared/ui/filters";
import { ListModule } from "../../../../../../../../../shared/ui/list";
import { QrCodeModule } from "../../../../../../../../../shared/ui/qr-code";
import { TooltipModule } from "../../../../../../../../../shared/ui/tooltip";
import { TablesComponent } from "./layout/tables.component";
import { TABLES_PROVIDERS } from "./providers";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent],
	imports: [
		CommonModule,
		TablesRoutingModule,
		InputModule,
		TypographyModule,
		DatatableModule,
		ButtonModule,
		IconModule,
		ImageModule,
		ActionsModule,
		TooltipModule,
		TranslocoModule,
		AddHeaderModule,
		FiltersModule,
		ListModule,
		TableDialogModule,
		QrCodeModule,
		TableModule
	],
	providers: TABLES_PROVIDERS
})
export class TablesModule {}
