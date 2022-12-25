import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { AngularSvgIconModule } from "angular-svg-icon";

import type { IFactory } from "../../interfaces";
import { ICON_CONFIG } from "./injection-tokens";
import type { IIconConfig } from "./interfaces";
import { IconComponent } from "./layout/icon.component";

@NgModule({
	declarations: [IconComponent],
	imports: [CommonModule, HttpClientModule, AngularSvgIconModule],
	exports: [IconComponent]
})
export class IconModule {
	static forRoot(iconConfigFactory: IFactory<IIconConfig>): ModuleWithProviders<IconModule> {
		return {
			ngModule: IconModule,
			providers: [
				...(AngularSvgIconModule.forRoot().providers || []),
				{
					provide: ICON_CONFIG,
					...iconConfigFactory
				}
			]
		};
	}
}
