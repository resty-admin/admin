import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-tables-page-skeleton",
	templateUrl: "./tables-page-skeleton.component.html",
	styleUrls: ["./tables-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablesPageSkeletonComponent {}
