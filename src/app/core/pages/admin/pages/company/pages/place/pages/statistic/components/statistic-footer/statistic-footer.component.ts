import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { PlaceVerificationStatusEnum } from "@graphql";

import { STATISTIC_PAGE } from "../../constants";

@Component({
	selector: "app-statistic-footer",
	templateUrl: "./statistic-footer.component.html",
	styleUrls: ["./statistic-footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticFooterComponent {
	@Output() buttonClicked = new EventEmitter<PlaceVerificationStatusEnum>();

	@Input() verificationStatus: PlaceVerificationStatusEnum = PlaceVerificationStatusEnum.NotVerified;
	readonly statisticPage = STATISTIC_PAGE;

	emitButotnClick() {
		this.buttonClicked.emit(this.verificationStatus);
	}
}
