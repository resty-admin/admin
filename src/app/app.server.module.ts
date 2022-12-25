import { NgModule } from "@angular/core";
import { ServerModule } from "@angular/platform-server";

import { CoreModule } from "./core/core.module";
import { CoreComponent } from "./core/layout/core.component";

@NgModule({
	imports: [CoreModule, ServerModule],
	bootstrap: [CoreComponent]
})
export class AppServerModule {}
