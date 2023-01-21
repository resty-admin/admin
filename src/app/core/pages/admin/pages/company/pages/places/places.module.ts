import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlaceDialogModule } from "@features/places/ui/place-dialog/place-dialog.module";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { TypographyModule } from "@shared/ui/typography";

import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";
import { PLACES_PROVIDERS } from "./providers";

@NgModule({
	declarations: [PlacesComponent],
	imports: [
		CommonModule,
		PlacesRoutingModule,
		ImageModule,
		IconModule,
		ButtonModule,
		PipesModule,
		TypographyModule,
		I18nModule,
		PlaceDialogModule
	],
	providers: PLACES_PROVIDERS
})
export class PlacesModule {}
