import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-order-skeleton",
	templateUrl: "./order-skeleton.component.html",
	styleUrls: ["./order-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSkeletonComponent {}
