import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TypographyModule } from "@shared/ui/typography";

import { PlaceComponent } from "./layout/place.component";
import { PlaceRoutingModule } from "./place-routing.module";

@NgModule({
	declarations: [PlaceComponent],
	imports: [CommonModule, PlaceRoutingModule, TypographyModule],
	exports: [PlaceComponent]
})
export class PlaceModule {}
