import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CodeInputModule as _CodeInputModule } from "angular-code-input";

import { CODE_INPUT_CONFIG } from "./injection-tokens";
import type { ICodeInputConfig } from "./interfaces";
import { CodeInputComponent } from "./layout/code-input.component";

@NgModule({
	declarations: [CodeInputComponent],
	imports: [CommonModule, ReactiveFormsModule, _CodeInputModule],
	exports: [CodeInputComponent]
})
export class CodeInputModule {
	static forRoot(codeInputConfig: ICodeInputConfig): ModuleWithProviders<CodeInputModule> {
		return {
			ngModule: CodeInputModule,
			providers: [
				...(_CodeInputModule.forRoot(codeInputConfig).providers || []),
				{
					provide: CODE_INPUT_CONFIG,
					useValue: codeInputConfig
				}
			]
		};
	}
}
