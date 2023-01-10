import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-dashboard-card",
	templateUrl: "./dashboard-card.component.html",
	styleUrls: ["./dashboard-card.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCardComponent {
	@Input() label = "";
	@Input() value?: number | null;
	@Input() icon = "";
	@Input() link = "";
}
