import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-accounting-systems-page-skeleton",
	templateUrl: "./accounting-systems-page-skeleton.component.html",
	styleUrls: ["./accounting-systems-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsPageSkeletonComponent {}
