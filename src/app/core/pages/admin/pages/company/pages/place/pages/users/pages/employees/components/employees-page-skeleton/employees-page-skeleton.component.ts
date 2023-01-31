import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-employees-page-skeleton",
	templateUrl: "./employees-page-skeleton.component.html",
	styleUrls: ["./employees-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageSkeletonComponent {}
