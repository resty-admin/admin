import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { PlaceVerificationStatusEnum } from "../../../../../../../../../../../../../graphql";
import { getI18nProvider } from "../../../../../../../../../../../../shared/i18n";
import { STATISTIC_FOOTER_I18N } from "../constants";

@Component({
	selector: "app-statistic-footer",
	templateUrl: "./statistic-footer.component.html",
	styleUrls: ["./statistic-footer.component.scss"],
	providers: [getI18nProvider(STATISTIC_FOOTER_I18N, (lang) => import(`../i18n/${lang}.json`))],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticFooterComponent {
	@Output() buttonClicked = new EventEmitter<PlaceVerificationStatusEnum>();

	@Input() verificationStatus?: PlaceVerificationStatusEnum | null;
	readonly statisticFooterI18n = STATISTIC_FOOTER_I18N;

	emitButotnClick() {
		this.buttonClicked.emit(
			this.verificationStatus === PlaceVerificationStatusEnum.Verified
				? PlaceVerificationStatusEnum.NotVerified
				: PlaceVerificationStatusEnum.NotVerified
		);
	}
}
