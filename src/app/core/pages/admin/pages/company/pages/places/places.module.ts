import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AuthModule } from "@features/auth/auth.module";
import { PlaceDialogModule } from "@features/places/ui/place-dialog/place-dialog.module";
import { I18nModule } from "@shared/modules/i18n";
import { PipesModule } from "@shared/modules/pipes";
import { ButtonModule } from "@shared/ui/button";
import { IconModule } from "@shared/ui/icon";
import { ImageModule } from "@shared/ui/image";
import { SkeletonModule } from "@shared/ui/skeleton";
import { TypographyModule } from "@shared/ui/typography";

import { PLACES_COMPONENTS } from "./components";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent, ...PLACES_COMPONENTS],
	imports: [
		CommonModule,
		PlacesRoutingModule,
		ImageModule,
		IconModule,
		ButtonModule,
		PipesModule,
		TypographyModule,
		I18nModule,
		PlaceDialogModule,
		SkeletonModule,
		AuthModule
	]
})
export class PlacesModule {}
