import { ChangeDetectionStrategy, Component } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { DASHBOARD_HEADER_I18N } from "../constants";

@Component({
	selector: "app-dashboard-header",
	templateUrl: "./dashboard-header.component.html",
	styleUrls: ["./dashboard-header.component.scss"],
	providers: [getI18nProvider(DASHBOARD_HEADER_I18N, (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent {
	readonly dashboardHeaderI18n = DASHBOARD_HEADER_I18N;
}
