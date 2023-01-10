import { ChangeDetectionStrategy, Component } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";

@Component({
	selector: "app-dashboard-footer",
	templateUrl: "./dashboard-footer.component.html",
	styleUrls: ["./dashboard-footer.component.scss"],
	providers: [getI18nProvider("dashboardFooter", (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFooterComponent {}
