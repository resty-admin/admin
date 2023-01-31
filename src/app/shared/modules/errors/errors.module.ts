import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

import { ERRORS_CONFIG } from "./injection-tokens";
import type { IErrorsConfig } from "./interfaces";

@NgModule({
	imports: [CommonModule]
})
export class ErrorsModule {
	static forRoot(config?: IErrorsConfig): ModuleWithProviders<ErrorsModule> {
		return {
			ngModule: ErrorsModule,
			providers: [{ provide: ERRORS_CONFIG, useValue: config }]
		};
	}
}
