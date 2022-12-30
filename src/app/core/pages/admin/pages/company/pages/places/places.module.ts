import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PipesModule } from "src/app/shared/modules/pipes";
import { ButtonModule } from "src/app/shared/ui/button";
import { IconModule } from "src/app/shared/ui/icon";

import { PlacesFeatureModule } from "../../../../../../../features/places";
import { ImageModule } from "../../../../../../../shared/ui/image";
import { TypographyModule } from "../../../../../../../shared/ui/typography";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

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
		PlacesFeatureModule
	]
})
export class PlacesModule {}
