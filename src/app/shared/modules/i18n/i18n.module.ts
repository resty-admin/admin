import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import type { ModuleWithProviders } from "@angular/core";
import { APP_INITIALIZER, NgModule } from "@angular/core";

import type { II18nConfig } from "./interfaces";
import { I18nService } from "./services";
import { TranslocoModule } from "./transloco";

@NgModule({
	imports: [CommonModule, HttpClientModule, TranslocoModule],
	exports: [TranslocoModule]
})
export class I18nModule {
	static forRoot(config: Partial<II18nConfig>): ModuleWithProviders<I18nModule> {
		return {
			ngModule: I18nModule,
			providers: [
				{
					provide: APP_INITIALIZER,
					multi: true,
					useFactory: (_i18nService: I18nService) => () => _i18nService.appInitializer(config.defaultLang || ""),
					deps: [I18nService]
				},
				...(TranslocoModule.forRoot(config).providers || [])
			]
		};
	}
}
