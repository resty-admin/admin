import { CommonModule } from "@angular/common";
import type { ModuleWithProviders } from "@angular/core";
import { NgModule } from "@angular/core";
import { HotToastModule } from "@ngneat/hot-toast";

import { IconModule } from "../icon";
import { TOASTR_COMPONENTS, ToastrErrorComponent, ToastrLoadingComponent, ToastrSuccessComponent } from "./components";
import { TOASTR_CONFIG } from "./injection-tokens";
import type { IToastrConfig } from "./interfaces";
import { ToastrComponent } from "./layout/toastr.component";

@NgModule({
	declarations: [ToastrComponent, ...TOASTR_COMPONENTS],
	imports: [CommonModule, HotToastModule, IconModule],
	exports: [ToastrComponent, ...TOASTR_COMPONENTS]
})
export class ToastrModule {
	static forRoot(config?: IToastrConfig): ModuleWithProviders<ToastrModule> {
		return {
			ngModule: ToastrModule,
			providers: [
				...(HotToastModule.forRoot({
					success: {
						content: ToastrSuccessComponent
					},
					error: {
						content: ToastrErrorComponent
					},
					loading: {
						content: ToastrLoadingComponent
					},
					...config
				})?.providers || []),
				{ provide: TOASTR_CONFIG, useValue: config }
			]
		};
	}
}
