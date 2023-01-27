import type { Route } from "@angular/router";

import type { ILoadedRouterConfig } from "./loaded-route-config.interface";

export interface IInternalRoute extends Route {
	_loadedConfig?: ILoadedRouterConfig;
}
