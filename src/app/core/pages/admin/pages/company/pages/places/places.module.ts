import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { PipesModule } from "src/app/shared/modules/pipes";
import { ButtonModule } from "src/app/shared/ui/button";
import { FileModule } from "src/app/shared/ui/file";
import { IconModule } from "src/app/shared/ui/icon";
import { ImageModule } from "src/app/shared/ui/image";
import { InputModule } from "src/app/shared/ui/input";

import { PLACES_COMPONENTS } from "./components";
import { PlacesComponent } from "./layout/places.component";
import { PlacesRoutingModule } from "./places-routing.module";

@NgModule({
	declarations: [PlacesComponent, ...PLACES_COMPONENTS],
	imports: [
		CommonModule,
		PlacesRoutingModule,
		IconModule,
		ImageModule,
		ReactiveFormsModule,
		InputModule,
		ButtonModule,
		PipesModule,
		FileModule
	],
	exports: [PlacesComponent]
})
export class PlacesModule {}
