import { TRANSLOCO_SCOPE } from "@ngneat/transloco";

import { getScopeLoader } from "../loaders";

export function getScopeProvider(scope: string, loader: (lang: string) => Promise<JSON>) {
	return {
		provide: TRANSLOCO_SCOPE,
		useValue: {
			scope,
			loader: getScopeLoader(loader)
		}
	};
}
