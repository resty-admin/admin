import { APP_INITIALIZER } from "@angular/core";

export const AUTH_INITIALIZER = {
	provide: APP_INITIALIZER,
	multi: true,
	useFactory: () => true
	// useFactory: (authStoreService: AuthStoreService) => async () =>
	// 	firstValueFrom(authStoreService.persist.initialized$.pipe(switchMap(() => authStoreService.getMe()))),
	// deps: [AuthStoreService]
};
