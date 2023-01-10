import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-accounting-system",
	templateUrl: "./accounting-system.component.html",
	styleUrls: ["./accounting-system.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemComponent {
	@Input() accountingSystem: any;
}
