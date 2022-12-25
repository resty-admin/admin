import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { NgProgressModule } from "ngx-progressbar";
import { NgProgressHttpModule } from "ngx-progressbar/http";
import { NgProgressRouterModule } from "ngx-progressbar/router";

import { PROGRESS_BAR_CONFIG } from "./configs";
import { ProgressBarComponent } from "./layout/progress-bar.component";

@NgModule({
	declarations: [ProgressBarComponent],
	imports: [CommonModule, NgProgressModule, NgProgressHttpModule, NgProgressRouterModule],
	exports: [ProgressBarComponent]
})
export class ProgressBarModule {
	static forRoot(): ModuleWithProviders<ProgressBarModule> {
		return {
			ngModule: ProgressBarModule,
			providers: NgProgressRouterModule.withConfig(PROGRESS_BAR_CONFIG).providers || []
		};
	}
}
