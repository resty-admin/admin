import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-productt-page-skeleton",
	templateUrl: "./product-page-skeleton.component.html",
	styleUrls: ["./product-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageSkeletonComponent {}
