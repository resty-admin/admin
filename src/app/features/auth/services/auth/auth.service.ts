import { Injectable } from "@angular/core";
import { catchError, map, of, shareReplay, take, tap } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { CryptoService } from "src/app/shared/modules/crypto";
import { JwtService } from "src/app/shared/modules/jwt";
import { RouterService } from "src/app/shared/modules/router";

import type { UpdateUserInput, UserEntity } from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import {
	DeleteMeGQL,
	ForgotPasswordGQL,
	GetMeGQL,
	GoogleGQL,
	ResetPasswordGQL,
	SignInGQL,
	SignUpGQL,
	TelegramGQL,
	UpdateMeGQL,
	VerifyCodeGQL
} from "../../graphql/auth";
import { AuthRepository } from "../../repositories";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	readonly me$ = this.getMe().pipe(shareReplay({ refCount: true }));

	constructor(
		private readonly _getMeGQL: GetMeGQL,
		private readonly _updateMeGQL: UpdateMeGQL,
		private readonly _deleteMeGQL: DeleteMeGQL,
		private readonly _signInGQL: SignInGQL,
		private readonly _signUpGQL: SignUpGQL,
		private readonly _telegramGQL: TelegramGQL,
		private readonly _verifyCodeGQL: VerifyCodeGQL,
		private readonly _forgotPasswordGQL: ForgotPasswordGQL,
		private readonly _resetPasswordGQL: ResetPasswordGQL,
		private readonly _googleGQL: GoogleGQL,
		private readonly _cryptoService: CryptoService,
		private readonly _authRepository: AuthRepository,
		private readonly _jwtService: JwtService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService
	) {}

	updateAccessToken(accessToken?: string) {
		return this._authRepository.updateAccessToken(accessToken);
	}

	signIn(body: any) {
		return this._signInGQL.mutate({ body: { ...body, password: this._cryptoService.decrypt(body.password) } }).pipe(
			map((result) => result.data?.signIn.accessToken),
			tap((accessToken) => {
				this.updateAccessToken(accessToken);
			})
		);
	}

	signUp(body: any) {
		return this._signUpGQL.mutate({ body: { ...body, password: this._cryptoService.decrypt(body.password) } }).pipe(
			map((result) => result.data?.signUp.accessToken),
			tap((accessToken) => {
				this.updateAccessToken(accessToken);
			})
		);
	}

	resetPassword(body: any) {
		return this._resetPasswordGQL.mutate({ body }).pipe(
			map((result) => result.data?.resetPassword.accessToken),
			tap((accessToken) => {
				this.updateAccessToken(accessToken);
			})
		);
	}

	forgotPassword(body: any) {
		return this._forgotPasswordGQL.mutate({ body });
	}

	verifyCode(code: number) {
		return this._verifyCodeGQL.mutate({ code }).pipe(
			map((result) => result.data?.verifyCode.accessToken),
			tap((accessToken) => {
				this.updateAccessToken(accessToken);
			})
		);
	}

	telegram(telegramUser: any) {
		return this._telegramGQL.mutate({ telegramUser }).pipe(
			map((result) => result.data?.telegram.accessToken),
			tap((accessToken) => {
				this.updateAccessToken(accessToken);
			})
		);
	}

	google(telegramUser: any) {
		return this._googleGQL.mutate({ telegramUser }).pipe(
			map((result) => result.data?.telegram.accessToken),
			tap((accessToken) => {
				this.updateAccessToken(accessToken);
			})
		);
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
		this.updateAccessToken(undefined);
		await this._routerService.navigateByUrl(ADMIN_ROUTES.SIGN_IN.absolutePath);
	}
}
