import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import type { ModuleWithProviders } from "@angular/core";
import { APP_INITIALIZER, NgModule } from "@angular/core";
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, translocoConfig } from "@ngneat/transloco";
import { TranslocoModule } from "@ngneat/transloco";
import { I18N_CONFIG } from "@shared/modules/i18n/injection-tokens";
import { TranslocoHttpLoader } from "@shared/modules/i18n/loaders";

import type { II18nConfig } from "./interfaces";
import { I18nService } from "./services";

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
				{
					provide: I18N_CONFIG,
					useValue: config
				},
				{
					provide: TRANSLOCO_CONFIG,
					useValue: translocoConfig(config)
				},
				{
					provide: TRANSLOCO_LOADER,
					useClass: TranslocoHttpLoader
				}
				// ...(TranslocoPersistTranslationsModule.forRoot({
				// 	loader: TranslocoHttpLoader,
				// 	storage: {
				// 		provide: PERSIST_TRANSLATIONS_STORAGE,
				// 		useValue: config.storage,
				// 	},
				// 	ttl: 86_400,
				// }).providers || []),
			]
		};
	}
}
