import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

import { SELECT_CONFIG } from "./injection-tokens";
import type { ISelectConfig } from "./interfaces";
import { SelectComponent } from "./layout/select.component";

@NgModule({
	declarations: [SelectComponent],
	imports: [CommonModule, NgSelectModule, ReactiveFormsModule],
	exports: [SelectComponent]
})
export class SelectModule {
	static forRoot(selectConfig: ISelectConfig): ModuleWithProviders<SelectModule> {
		return {
			ngModule: SelectModule,
			providers: [{ provide: SELECT_CONFIG, useValue: selectConfig }]
		};
	}
}
