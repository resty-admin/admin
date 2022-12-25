import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import type { IFactory } from "../../interfaces";
import { ThemeToggleModule } from "../../ui/theme-toggle";
import { THEME_CONFIG } from "./injection-tokens";
import type { IThemeConfig } from "./interfaces";
import { ThemeComponent } from "./layout/theme.component";

@NgModule({
	declarations: [ThemeComponent],
	imports: [CommonModule, ReactiveFormsModule, ThemeToggleModule],
	exports: [ThemeComponent]
})
export class ThemeModule {
	static forRoot(themeFactory: IFactory<IThemeConfig>): ModuleWithProviders<ThemeModule> {
		return {
			ngModule: ThemeModule,
			providers: [
				{
					provide: THEME_CONFIG,
					...themeFactory
				}
			]
		};
	}
}
