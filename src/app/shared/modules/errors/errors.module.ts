import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

import { ERRORS_CONFIG } from "./injection-tokens";
import { ErrorsInterceptor } from "./interceptors";
import type { IErrorsConfig } from "./interfaces";

@NgModule({
	imports: [CommonModule]
})
export class ErrorsModule {
	static forRoot(config?: IErrorsConfig): ModuleWithProviders<ErrorsModule> {
		return {
			ngModule: ErrorsModule,
			providers: [
				{ provide: ERRORS_CONFIG, useValue: config },
				{ provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true }
			]
		};
	}
}
