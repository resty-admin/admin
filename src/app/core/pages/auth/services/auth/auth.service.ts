import { Injectable } from "@angular/core";
import type { Observable } from "rxjs";
import { catchError, map, of, shareReplay, take, tap } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { ApiService } from "src/app/shared/modules/api";
import { CryptoService } from "src/app/shared/modules/crypto";
import { JwtService } from "src/app/shared/modules/jwt";
import { RouterService } from "src/app/shared/modules/router";

import type { UpdateUserInput, UserEntity } from "../../../../../../graphql";
import { ToastrService } from "../../../../../shared/ui/toastr";
import { DeleteMeGQL, GetMeGQL, UpdateMeGQL } from "../../graphql/auth";
import { AuthRepository } from "../../repositories";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	readonly me$ = this.getMe().pipe(shareReplay({ refCount: true }));

	constructor(
		private readonly _apiService: ApiService,
		private readonly _cryptoService: CryptoService,
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService,
		private readonly _getMeGQL: GetMeGQL,
		private readonly _updateMeGQL: UpdateMeGQL,
		private readonly _deleteMeGQL: DeleteMeGQL
	) {}

	private _encryptPassword<T extends { password: string }>(body: T) {
		return { ...body, password: this._cryptoService.encrypt(body.password) };
	}

	private _updateAccessToken(): (source$: Observable<any>) => Observable<any> {
		return (source$) =>
			source$.pipe(
				tap(({ accessToken }) => {
					this._authRepository.updateAccessToken(accessToken);
				})
			);
	}

	updateAccessToken(accessToken: string) {
		return this._authRepository.updateAccessToken(accessToken);
	}

	getMe() {
		return this._getMeGQL.watch().valueChanges.pipe(
			map((result) => this._jwtService.decodeToken<UserEntity>(result.data.getMe.accessToken)),
			catchError(() => of(undefined))
		);
	}

	updateMe(user: UpdateUserInput) {
		return this._updateMeGQL.mutate({ user }).pipe(take(1), this._toastrService.observe("Пользователь"));
	}

	deleteMe() {
		return this._deleteMeGQL.mutate().pipe(take(1), this._toastrService.observe("Пользователь"));
	}

	async signOut() {
		this._authRepository.updateUser(undefined);
		this._authRepository.updateAccessToken(undefined);
		await this._routerService.navigateByUrl(ADMIN_ROUTES.SIGN_IN.absolutePath);
	}
}
