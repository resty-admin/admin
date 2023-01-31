import { Injectable } from "@angular/core";
import type {
	ForgotPasswordInput,
	ResetPasswordInput,
	SignInInput,
	SignUpInput,
	TelegramUserInput,
	UpdateMeInput,
	UserEntity
} from "@graphql";
import { CryptoService } from "@shared/modules/crypto";
import { JwtService } from "@shared/modules/jwt";
import type { Observable } from "rxjs";
import { catchError, of } from "rxjs";
import { map, tap } from "rxjs";

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
} from "../../graphql";
import { AuthRepository } from "../../repositories";

@Injectable({
	providedIn: "root"
})
export class AuthService {
	readonly getMeQuery = this._getMeGQL.watch();
	readonly me$ = this.getMeQuery.valueChanges.pipe(
		map((result) => this._jwtService.decodeToken<UserEntity>(result.data.getMe.accessToken)),
		catchError(() => of(null))
	);

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
		private readonly _jwtService: JwtService
	) {}

	private _getBodyWithEncryptedPassword<T extends { password: string }>(body: T) {
		return { body: { ...body, password: this._cryptoService.encrypt(body.password) } };
	}

	private _updateAccessToken(): (source$: Observable<string | undefined>) => Observable<string | undefined> {
		return (source$) => source$.pipe(tap((accessToken) => this.updateAccessToken(accessToken)));
	}

	async updateAccessToken(accessToken?: string) {
		this._authRepository.updateAccessToken(accessToken);
		await this.getMeQuery.resetLastResults();
	}

	signIn(body: SignInInput) {
		return this._signInGQL.mutate(this._getBodyWithEncryptedPassword(body)).pipe(
			map((result) => result.data?.signIn.accessToken),
			this._updateAccessToken()
		);
	}

	signUp(body: SignUpInput) {
		return this._signUpGQL.mutate(this._getBodyWithEncryptedPassword(body)).pipe(
			map((result) => result.data?.signUp.accessToken),
			this._updateAccessToken()
		);
	}

	resetPassword(body: ResetPasswordInput) {
		return this._resetPasswordGQL.mutate({ body }).pipe(
			map((result) => result.data?.resetPassword.accessToken),
			this._updateAccessToken()
		);
	}

	forgotPassword(body: ForgotPasswordInput) {
		return this._forgotPasswordGQL.mutate({ body });
	}

	verifyCode(code: number) {
		return this._verifyCodeGQL.mutate({ code }).pipe(
			map((result) => result.data?.verifyCode.accessToken),
			this._updateAccessToken()
		);
	}

	telegram(telegramUser: TelegramUserInput) {
		return this._telegramGQL.mutate({ telegramUser }).pipe(
			map((result) => result.data?.telegram.accessToken),
			this._updateAccessToken()
		);
	}

	google(telegramUser: TelegramUserInput) {
		return this._googleGQL.mutate({ telegramUser }).pipe(
			map((result) => result.data?.telegram.accessToken),
			this._updateAccessToken()
		);
	}

	updateMe(user: UpdateMeInput) {
		return this._updateMeGQL.mutate({ user });
	}

	deleteMe() {
		return this._deleteMeGQL.mutate();
	}

	async signOut() {
		this._authRepository.updateUser(undefined);
		await this.updateAccessToken(undefined);
	}
}
