import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";

import { FILES_INTEPCEPTORS } from "./interceptors";

@NgModule({
	imports: [CommonModule]
})
export class FilesModule {
	static forRoot(): ModuleWithProviders<FilesModule> {
		return {
			ngModule: FilesModule,
			providers: FILES_INTEPCEPTORS
		};
	}
}
