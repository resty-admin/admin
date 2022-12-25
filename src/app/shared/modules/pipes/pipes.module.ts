import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SHARED_PIPES } from "./pipes";

@NgModule({
	declarations: SHARED_PIPES,
	imports: [CommonModule],
	exports: SHARED_PIPES
})
export class PipesModule {}
