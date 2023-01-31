import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-tables-skeleton",
	templateUrl: "./tables-skeleton.component.html",
	styleUrls: ["./tables-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesSkeletonComponent {}
