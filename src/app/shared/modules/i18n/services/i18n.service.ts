import { Injectable } from "@angular/core";
import type { HashMap, TranslateParams } from "@ngneat/transloco";
import { TranslocoService } from "@ngneat/transloco";
import type { TranslocoScope } from "@ngneat/transloco/lib/types";
import type { LoadOptions } from "@ngneat/transloco/lib/types";
import type { Observable } from "rxjs";
import { catchError, firstValueFrom, of, tap } from "rxjs";

@Injectable({ providedIn: "root" })
export class I18nService {
	constructor(private readonly _translocoService: TranslocoService) {}

	selectTranslate<T = unknown>(
		key: TranslateParams,
		parameters?: HashMap,
		lang?: TranslocoScope | string,
		_isObject?: boolean
	): Observable<T> {
		return this._translocoService.selectTranslate(key, parameters, lang, _isObject);
	}

	selectTranslation(language?: string) {
		return this._translocoService.selectTranslation(language);
	}

	translate<T = string>(key: TranslateParams, parameters?: HashMap, lang?: string): T {
		return this._translocoService.translate(key, parameters, lang);
	}

	load(path: string, options?: LoadOptions) {
		return this._translocoService.load(path, options);
	}

	setActiveLang(lang: string) {
		return this._translocoService.setActiveLang(lang);
	}

	async appInitializer(defaultLang: string) {
		return firstValueFrom(
			this.load(defaultLang).pipe(
				catchError(() => of(true)),
				tap(() => {
					this.setActiveLang(defaultLang);
				})
			)
		);
	}
}
