import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-companies-skeleton",
	templateUrl: "./companies-skeleton.component.html",
	styleUrls: ["./companies-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesSkeletonComponent {}
