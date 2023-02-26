import { Inject, Injectable } from "@angular/core";
import { CryptoJs } from "@shared/classes";

import { CRYPTO_CONFIG } from "../../injection-tokens";
import { ICryptoConfig } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class CryptoService {
	private readonly _crypto = new CryptoJs(this._cryptoConfig.secret);

	constructor(@Inject(CRYPTO_CONFIG) private readonly _cryptoConfig: ICryptoConfig) {
		const password = "test";
		const cryptedPassword = this.encrypt(password);

		console.log(cryptedPassword);
	}

	encrypt(data: string) {
		return this._crypto.encrypt(data);
	}

	decrypt(data: string) {
		return this._crypto.decrypt(data);
	}
}
