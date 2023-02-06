import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import type { Translation, TranslocoLoader } from "@ngneat/transloco";
import { catchError, timeout } from "rxjs";

import { I18N_CONFIG } from "../injection-tokens";
import { II18nConfig } from "../interfaces";

@Injectable({ providedIn: "root" })
export class TranslocoHttpLoader implements TranslocoLoader {
	constructor(
		@Inject(I18N_CONFIG) private readonly _i18nConfig: II18nConfig,
		private readonly _httpClient: HttpClient
	) {}

	getTranslation(lang: string) {
		return this._httpClient.get<Translation>(`${this._i18nConfig.url}/${lang}.json`).pipe(
			timeout(500),
			catchError(() => this._httpClient.get<Translation>(`assets/i18n/${lang}.json`))
		);
	}
}
