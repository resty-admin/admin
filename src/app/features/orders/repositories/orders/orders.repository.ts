import { Injectable } from "@angular/core";
import { createStore, select, setProp, withProps } from "@ngneat/elf";
import { persistState } from "@ngneat/elf-persist-state";
import { LocalforageService } from "@shared/modules/localforage";
import { includeKeys } from "elf-sync-state";

export interface IOrdersState {
	activeOrderId?: string;
}

@Injectable({ providedIn: "root" })
export class OrdersRepository {
	private readonly _store = createStore({ name: "orders" }, withProps<IOrdersState>({ activeOrderId: undefined }));

	constructor() {
		persistState(this._store, {
			storage: LocalforageService.storage,
			source: () => this._store.pipe(includeKeys(["activeOrderId"]))
		});
	}

	readonly store$ = this._store.pipe(select((store) => store));

	readonly activeOrderId$ = this.store$.pipe(select((state) => state.activeOrderId));

	setActiveOrderId(activeOrderId?: string) {
		return this._store.update(setProp("activeOrderId", activeOrderId));
	}
}
