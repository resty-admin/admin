import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-companies-page-skeleton",
	templateUrl: "./companies-page-skeleton.component.html",
	styleUrls: ["./companies-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesPageSkeletonComponent {}
