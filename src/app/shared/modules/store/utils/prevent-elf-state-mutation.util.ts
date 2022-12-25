import { deepFreeze, elfHooks } from "@ngneat/elf";

export function preventElfStateMutation() {
	elfHooks.registerPreStoreUpdate((currentState, nextState) => deepFreeze(nextState));
}

preventElfStateMutation();
