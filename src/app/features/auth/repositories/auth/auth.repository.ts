import { Injectable } from "@angular/core";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { ACCESS_TOKEN } from "@shared/constants";
import { LanguagesEnum, ThemeEnum } from "@shared/enums";
import { LocalforageService } from "@shared/modules/localforage";
import { includeKeys } from "elf-sync-state";

import type { IAuthState } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class AuthRepository {
	private readonly _store = createStore(
		{ name: "auth" },
		withProps<IAuthState>({
			[ACCESS_TOKEN]: undefined,
			theme: ThemeEnum.LIGHT,
			language: LanguagesEnum.UK
		})
	);

	readonly persist = persistState(this._store, {
		storage: LocalforageService.storage,
		source: () => this._store.pipe(includeKeys([ACCESS_TOKEN, "theme", "language"]))
	});

	private readonly _store$ = this._store.pipe(select((store) => store));

	readonly language$ = this._store$.pipe(select((state) => state.language));
	readonly theme$ = this._store$.pipe(select((state) => state.theme));
	readonly accessToken$ = this._store$.pipe(select((state) => state[ACCESS_TOKEN]));

	updateAccessToken(accessToken?: string) {
		return this._store.update(setProp(ACCESS_TOKEN, accessToken));
	}

	updateLanguage(language: LanguagesEnum) {
		return this._store.update(setProp("language", language));
	}

	updateTheme(theme: ThemeEnum) {
		return this._store.update(setProp("theme", theme));
	}
}
