import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-employees-skeleton",
	templateUrl: "./employees-skeleton.component.html",
	styleUrls: ["./employees-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesSkeletonComponent {}
