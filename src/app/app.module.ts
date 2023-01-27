import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "./core/core.module";
import { CoreComponent } from "./core/layout/core.component";

@NgModule({
	imports: [CoreModule, BrowserAnimationsModule],
	bootstrap: [CoreComponent]
})
export class AppModule {}
