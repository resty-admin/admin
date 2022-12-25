import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FILE_CONFIG } from "./injection-tokens";
import type { IFileConfig } from "./interfaces";
import { FileComponent } from "./layout/file.component";

@NgModule({
	declarations: [FileComponent],
	imports: [CommonModule, ReactiveFormsModule],
	exports: [FileComponent]
})
export class FileModule {
	static forRoot(fileConfig: IFileConfig): ModuleWithProviders<FileModule> {
		return {
			ngModule: FileModule,
			providers: [{ provide: FILE_CONFIG, useValue: fileConfig }]
		};
	}
}
