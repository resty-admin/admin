import { Injectable } from "@angular/core";
import type { UserEntity } from "@graphql";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { ACCESS_TOKEN } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";
import { LocalforageService } from "@shared/modules/localforage";
import { includeKeys } from "elf-sync-state";

import type { IAuthState } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class AuthRepository {
	private readonly _store = createStore(
		{ name: "auth" },
		withProps<IAuthState>({
			user: undefined,
			[ACCESS_TOKEN]: undefined
		})
	);

	readonly persist = persistState(this._store, {
		storage: LocalforageService.storage,
		source: () => this._store.pipe(includeKeys([ACCESS_TOKEN]))
	});

	readonly store$ = this._store.pipe(select((store) => store));

	updateAccessToken(accessToken?: string) {
		return this._store.update(setProp(ACCESS_TOKEN, accessToken));
	}

	updateUser(user?: DeepPartial<UserEntity>) {
		return this._store.update(setProp("user", user));
	}
}
