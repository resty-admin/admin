import { environment } from "@env/environment";
import type { ICryptoConfig } from "@shared/modules/crypto";

export const CRYPTO_CONFIG: ICryptoConfig = {
	secret: environment.cryptoSecret
};
