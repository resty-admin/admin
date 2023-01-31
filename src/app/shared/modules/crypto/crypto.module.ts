import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

import { CRYPTO_CONFIG } from "./injection-tokens";
import type { ICryptoConfig } from "./interfaces";

@NgModule({
	imports: [CommonModule]
})
export class CryptoModule {
	static forRoot(config: ICryptoConfig): ModuleWithProviders<CryptoModule> {
		return {
			ngModule: CryptoModule,
			providers: [
				{
					provide: CRYPTO_CONFIG,
					useValue: config
				}
			]
		};
	}
}
