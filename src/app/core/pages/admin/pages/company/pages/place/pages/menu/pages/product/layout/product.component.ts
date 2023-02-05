import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-products",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {}
