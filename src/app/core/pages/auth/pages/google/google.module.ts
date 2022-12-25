import { NgModule } from "@angular/core";

import { GoogleRoutingModule } from "./google-routing.module";
import { GoogleComponent } from "./layout/google.component";

@NgModule({
	declarations: [GoogleComponent],
	exports: [GoogleComponent],
	imports: [GoogleRoutingModule]
})
export class GoogleModule {}
