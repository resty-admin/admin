import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-order-info-skeleton",
	templateUrl: "./order-info-skeleton.component.html",
	styleUrls: ["./order-info-skeleton.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInfoSkeletonComponent {}
