import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { I18nModule } from "@shared/modules/i18n";
import { ButtonModule } from "@shared/ui/button";
import { CodeInputModule } from "@shared/ui/code-input";
import { TypographyModule } from "@shared/ui/typography";

import { ConnectToPlaceRoutingModule } from "./connect-to-place-routing.module";
import { ConnectToPlaceComponent } from "./layout/connect-to-place.component";

@NgModule({
	declarations: [ConnectToPlaceComponent],
	imports: [
		CommonModule,
		ConnectToPlaceRoutingModule,
		TypographyModule,
		ReactiveFormsModule,
		I18nModule,
		ButtonModule,
		CodeInputModule
	]
})
export class ConnectToPlaceModule {}
