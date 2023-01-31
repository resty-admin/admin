import type { Route } from "@angular/router";

import type { INavigationSkeletonRouteData } from "./navigation-skeleton-route-data.interface";

export interface INavigationSkeletonRoute extends Route {
	skeleton?: INavigationSkeletonRouteData;
	children?: INavigationSkeletonRouteData[];
}
