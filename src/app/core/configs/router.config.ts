import type { ExtraOptions } from "@angular/router";
import { PreloadAllModules } from "@angular/router";

export const ROUTER_CONFIG: ExtraOptions = {
	preloadingStrategy: PreloadAllModules,
	paramsInheritanceStrategy: "always",
	scrollPositionRestoration: "enabled"
};
