import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { ApolloModule as _ApolloModule } from "apollo-angular";

import type { IApolloConfig } from "./interfaces";
import { getApolloProvider } from "./providers";

@NgModule({
	imports: [CommonModule, _ApolloModule]
})
export class ApolloModule {
	static forRoot(config: IApolloConfig): ModuleWithProviders<ApolloModule> {
		return {
			ngModule: ApolloModule,
			providers: [getApolloProvider(config.url)]
		};
	}
}
