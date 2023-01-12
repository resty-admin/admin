import { ChangeDetectionStrategy, Component } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { DASHBOARD_FOOTER_I18N } from "../constants";

@Component({
	selector: "app-dashboard-footer",
	templateUrl: "./dashboard-footer.component.html",
	styleUrls: ["./dashboard-footer.component.scss"],
	providers: [getI18nProvider(DASHBOARD_FOOTER_I18N, (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFooterComponent {
	readonly dashboardFooterI18n = DASHBOARD_FOOTER_I18N;
}
