import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { popperVariation, provideTippyConfig, TippyDirective, tooltipVariation } from "@ngneat/helipopper";

import { TooltipComponent } from "./layout/tooltip.component";

@NgModule({
	declarations: [TooltipComponent],
	imports: [CommonModule, TippyDirective],
	exports: [TippyDirective]
})
export class TooltipModule {
	static forRoot(): ModuleWithProviders<TooltipModule> {
		return {
			ngModule: TooltipModule,
			providers: [
				provideTippyConfig({
					defaultVariation: "tooltip",
					variations: {
						tooltip: tooltipVariation,
						popper: popperVariation
					}
				})
			]
		};
	}
}
