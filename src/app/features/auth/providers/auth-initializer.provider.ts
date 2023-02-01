import { APP_INITIALIZER } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { AuthRepository } from "../repositories";

export const AUTH_INITIALIZER = {
	provide: APP_INITIALIZER,
	multi: true,
	useFactory: (authRepository: AuthRepository) => () => firstValueFrom(authRepository.persist.initialized$),
	deps: [AuthRepository]
};
