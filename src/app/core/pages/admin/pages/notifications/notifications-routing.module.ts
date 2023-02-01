import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { NotificationsPageSkeletonComponent } from "./components";
import { NotificationsComponent } from "./layout/notifications.component";
import { NotificationsPageResolver } from "./resolvers";

export const NOTIFICATIONS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: NotificationsComponent,
		data: {
			animation: "notificationsPage"
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
