import { JWT_OPTIONS } from "@auth0/angular-jwt";
import { environment } from "@env/environment";
import { AuthRepository } from "@features/auth";
import type { IJwtConfig } from "@shared/modules/jwt";
import { firstValueFrom, map } from "rxjs";

const url = new URL(environment.apiUrl);
const domain = `${url.hostname}${url.port ? `:${url.port}` : ``}`;

export const JWT_CONFIG: IJwtConfig = {
	jwtOptionsProvider: {
		provide: JWT_OPTIONS,
		useFactory: (authRepository: AuthRepository) => ({
			tokenGetter: () => firstValueFrom(authRepository.store$.pipe(map(({ accessToken }) => accessToken))),
			allowedDomains: [domain]
		}),
		deps: [AuthRepository]
	}
};
