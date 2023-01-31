import { TRANSLOCO_SCOPE } from "@ngneat/transloco";
import { I18N_SCOPE } from "@shared/modules/i18n";

import { getScopeLoader } from "../loaders";

export function getI18nProviders(scope: string, loader?: (lang: string) => Promise<JSON>) {
	return [
		{
			provide: TRANSLOCO_SCOPE,
			useValue: loader ? { scope, loader: getScopeLoader(loader) } : scope,
			multi: true
		},
		{
			provide: I18N_SCOPE,
			useValue: scope
		}
	];
}
