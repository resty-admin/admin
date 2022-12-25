import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ShiftComponent } from "./layout/shift.component";

export const SHIFT_ROUTES: Route[] = [
	{
		path: "",
		component: ShiftComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(SHIFT_ROUTES)],
	exports: [RouterModule]
})
export class ShiftRoutingModule {}
