import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import { IHall } from "../interfaces/hall.interface";

@Component({
	selector: "app-hall",
	templateUrl: "./hall.component.html",
	styleUrls: ["./hall.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallComponent {
	@Input() hall?: IHall;
	@Input() actions: any;
}
