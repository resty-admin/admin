import { GuardsCheckEnd, NavigationEnd } from "@angular/router";
import type { NgProgressRouterConfig } from "ngx-progressbar/router/ng-progress-router.interface";

export const PROGRESS_BAR_CONFIG: NgProgressRouterConfig = {
	startEvents: [GuardsCheckEnd],
	completeEvents: [NavigationEnd],
	delay: 100
};
