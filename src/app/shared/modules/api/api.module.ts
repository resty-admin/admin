import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

import { API_CONFIG } from "./injection-tokens";
import type { IApiConfig } from "./interfaces";

@NgModule({
	imports: [CommonModule, HttpClientModule]
})
export class ApiModule {
	static forRoot(apiConfig: IApiConfig): ModuleWithProviders<ApiModule> {
		return {
			ngModule: ApiModule,
			providers: [
				{
					provide: API_CONFIG,
					useValue: apiConfig
				}
			]
		};
	}
}
