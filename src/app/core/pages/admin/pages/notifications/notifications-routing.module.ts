import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { NotificationsPageSkeletonComponent } from "./components";
import { NOTIFICATIONS_PAGE } from "./constants";
import { NotificationsComponent } from "./layout/notifications.component";
import { NotificationsPageResolver } from "./resolvers";

export const NOTIFICATIONS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: NotificationsComponent,
		data: {
			animation: NOTIFICATIONS_PAGE
		},
		resolve: {
			places: NotificationsPageResolver
		},
		skeleton: {
			component: NotificationsPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(NOTIFICATIONS_ROUTES)],
	exports: [RouterModule]
})
export class NotificationsRoutingModule {}
