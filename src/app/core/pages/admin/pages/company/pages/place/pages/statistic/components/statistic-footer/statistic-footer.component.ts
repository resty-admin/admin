import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { PlaceVerificationStatusEnum } from "@graphql";

@Component({
	selector: "app-statistic-footer",
	templateUrl: "./statistic-footer.component.html",
	styleUrls: ["./statistic-footer.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticFooterComponent {
	@Output() buttonClicked = new EventEmitter<PlaceVerificationStatusEnum>();

	@Input() verificationStatus: PlaceVerificationStatusEnum = PlaceVerificationStatusEnum.NotVerified;

	emitButotnClick() {
		this.buttonClicked.emit(this.verificationStatus);
	}
}
