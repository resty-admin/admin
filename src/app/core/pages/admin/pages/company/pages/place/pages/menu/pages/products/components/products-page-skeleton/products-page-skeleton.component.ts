import { ChangeDetectionStrategy, Component } from "@angular/core";
import { skeletonLeaveAnimation } from "@shared/animations";

@Component({
	selector: "app-products-page-skeleton",
	templateUrl: "./products-page-skeleton.component.html",
	styleUrls: ["./products-page-skeleton.component.scss"],
	animations: [skeletonLeaveAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPageSkeletonComponent {}
