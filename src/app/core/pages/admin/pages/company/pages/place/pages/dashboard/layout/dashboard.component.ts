import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
	readonly cards = [
		{
			label: "Сотрудников",
			value: "15",
			icon: "user",
			routerLink: "../users"
		},
		{
			label: "Залов",
			value: "5",
			icon: "halls",
			routerLink: "../halls"
		},
		{
			label: "Клиетов",
			value: "5 000",
			icon: "group",
			routerLink: "../users"
		},
		{
			label: "Столов",
			value: "50",
			icon: "table",
			routerLink: "../halls"
		}
	];
}
