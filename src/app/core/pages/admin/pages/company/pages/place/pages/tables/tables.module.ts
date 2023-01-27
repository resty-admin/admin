import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TableModule } from "@features/tables";
import { TableDialogModule } from "@features/tables/ui/table-dialog/table-dialog.module";
import { TranslocoModule } from "@shared/modules/i18n";
import { ActionsModule } from "@shared/ui/actions";
import { AddHeaderModule } from "@shared/ui/add-header";
import { ButtonModule } from "@shared/ui/button";
import { DatatableModule } from "@shared/ui/datatable";
import { FiltersModule } from "@shared/ui/filters";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { InputModule } from "@shared/ui/input";
import { ListModule } from "@shared/ui/list";
import { QrCodeModule } from "@shared/ui/qr-code";
import { TooltipModule } from "@shared/ui/tooltip";
import { TypographyModule } from "@shared/ui/typography";

import { TABLES_COMPONENTS } from "./components";
import { TablesComponent } from "./layout/tables.component";
import { TABLES_PROVIDERS } from "./providers";
import { TablesRoutingModule } from "./tables-routing.module";

@NgModule({
	declarations: [TablesComponent, ...TABLES_COMPONENTS],
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
