import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-categories-page-skeleton",
	templateUrl: "./categories-page-skeleton.component.html",
	styleUrls: ["./categories-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesPageSkeletonComponent {}
