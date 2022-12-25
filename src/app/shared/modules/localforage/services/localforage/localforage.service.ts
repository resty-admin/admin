import type { StateStorage } from "@ngneat/elf-persist-state";
import * as localForage from "localforage";

export const LocalforageService = {
	storage: localForage.createInstance({ name: "resty" }) as unknown as StateStorage,

	async getItem<T>(key: string) {
		return this.storage.getItem(key) as unknown as T;
	}
};
