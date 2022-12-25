import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { DATATABLE_CONFIG } from "./injection-tokens";
import type { IDatatableConfig } from "./interfaces";
import { DatatableComponent } from "./layout/datatable.component";

@NgModule({
	declarations: [DatatableComponent],
	imports: [CommonModule, NgxDatatableModule],
	exports: [DatatableComponent]
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
