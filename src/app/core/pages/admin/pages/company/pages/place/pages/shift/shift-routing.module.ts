import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { ShiftPageSkeletonComponent } from "./components";
import { SHIFT_PAGE } from "./constants";
import { ShiftComponent } from "./layout/shift.component";
import { ShiftPageResolver } from "./resolvers";

export const SHIFT_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: ShiftComponent,
		data: {
			animation: SHIFT_PAGE
		},
		resolve: {
			shift: ShiftPageResolver
		},
		skeleton: {
			component: ShiftPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(SHIFT_ROUTES)],
	exports: [RouterModule]
})
export class ShiftRoutingModule {}
