import { ChangeDetectionStrategy, Component } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";

@Component({
	selector: "app-dashboard-header",
	templateUrl: "./dashboard-header.component.html",
	styleUrls: ["./dashboard-header.component.scss"],
	providers: [getI18nProvider("dashboardHeader", (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {}
