import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { JwtModule as _JwtModule } from "@auth0/angular-jwt";

import type { IJwtConfig } from "./interfaces";

@NgModule({
	imports: [CommonModule]
})
export class JwtModule {
	static forRoot(jwtConfig: IJwtConfig): ModuleWithProviders<JwtModule> {
		return {
			ngModule: JwtModule,
			providers: _JwtModule.forRoot(jwtConfig).providers || []
		};
	}
}
