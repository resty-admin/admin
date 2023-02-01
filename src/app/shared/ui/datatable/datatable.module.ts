import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { DATATABLE_DIRECTIVES } from "@shared/ui/datatable/directives";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { DATATABLE_CONFIG } from "./injection-tokens";
import type { IDatatableConfig } from "./interfaces";
import { DatatableComponent } from "./layout/datatable.component";

@NgModule({
	declarations: [DatatableComponent, ...DATATABLE_DIRECTIVES],
	imports: [CommonModule, NgxDatatableModule],
	exports: [DatatableComponent, ...DATATABLE_DIRECTIVES]
})
export class DatatableModule {
	static forRoot(datatableConfig: IDatatableConfig): ModuleWithProviders<DatatableModule> {
		return {
			ngModule: DatatableModule,
			providers: [
				{
					provide: DATATABLE_CONFIG,
					useValue: datatableConfig
				}
			]
		};
	}
}
