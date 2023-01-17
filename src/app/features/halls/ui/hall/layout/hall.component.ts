import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
	selector: "app-hall",
	templateUrl: "./hall.component.html",
	styleUrls: ["./hall.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallComponent {
	@Input() hall: any;
	@Input() actions: any;
}
