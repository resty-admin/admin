import { ChangeDetectionStrategy, Component } from "@angular/core";
import { getI18nProvider } from "@shared/i18n";

import { STATISTIC_HEADER } from "../constants";

@Component({
	selector: "app-statistic-header",
	templateUrl: "./statistic-header.component.html",
	styleUrls: ["./statistic-header.component.scss"],
	providers: [getI18nProvider(STATISTIC_HEADER, (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticHeaderComponent {
	readonly statisticHeader = STATISTIC_HEADER;
}
