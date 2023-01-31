import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-categories-skeleton",
	templateUrl: "./categories-skeleton.component.html",
	styleUrls: ["./categories-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesSkeletonComponent {}
