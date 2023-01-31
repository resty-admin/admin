import { TRANSLOCO_SCOPE } from "@ngneat/transloco";

import { getScopeLoader } from "../loaders";

export function getI18nProvider(scope: string, loader?: (lang: string) => Promise<JSON>) {
	return {
		provide: TRANSLOCO_SCOPE,
		useValue: loader ? { scope, loader: getScopeLoader(loader) } : scope,
		multi: true
	};
}
