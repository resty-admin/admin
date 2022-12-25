import { getRegistry } from "@ngneat/elf";

export function resetStores() {
	for (const [_, store] of getRegistry()) {
		store.reset();
	}
}

resetStores();
