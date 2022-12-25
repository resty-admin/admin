import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NotFoundComponent } from "./layout/not-found.component";
import { NotFoundRoutingModule } from "./not-found-routing.module";

@NgModule({
	declarations: [NotFoundComponent],
	imports: [CommonModule, NotFoundRoutingModule],
	exports: [NotFoundComponent]
})
export class NotFoundModule {}
