import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-accounting-systems-skeleton",
	templateUrl: "./accounting-systems-skeleton.component.html",
	styleUrls: ["./accounting-systems-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsSkeletonComponent {}
