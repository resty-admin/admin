import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import {
	TRANSLOCO_CONFIG,
	TRANSLOCO_LOADER,
	translocoConfig,
	TranslocoModule as _TranslocoModule
} from "@ngneat/transloco";

import { I18N_CONFIG } from "../injection-tokens";
import type { II18nConfig } from "../interfaces";
import { TranslocoHttpLoader } from "./loaders";

@NgModule({
	imports: [CommonModule],
	exports: [_TranslocoModule]
})
export class TranslocoModule {
	static forRoot(config: Partial<II18nConfig>): ModuleWithProviders<TranslocoModule> {
		return {
			ngModule: TranslocoModule,
			providers: [
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
