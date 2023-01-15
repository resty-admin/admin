import { ChangeDetectionStrategy, Component } from "@angular/core";

import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { STATISTIC_HEADER_I18N } from "../constants";

@Component({
	selector: "app-statistic-header",
	templateUrl: "./statistic-header.component.html",
	styleUrls: ["./statistic-header.component.scss"],
	providers: [getI18nProvider(STATISTIC_HEADER_I18N, (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticHeaderComponent {
	readonly statisticHeaderI18n = STATISTIC_HEADER_I18N;
}
