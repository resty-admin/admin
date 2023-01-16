import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-active-order",
	templateUrl: "./active-order.component.html",
	styleUrls: ["./active-order.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActiveOrderComponent {
	@Input() activeOrder: any;
	@Input() activeOrderLink: string = "";
}
