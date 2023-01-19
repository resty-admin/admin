import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

import type { HallEntity } from "../../../../../../graphql";
import type { IAction } from "../../../../../shared/ui/actions";
import { IHall } from "../interfaces/hall.interface";

@Component({
	selector: "app-hall",
	templateUrl: "./hall.component.html",
	styleUrls: ["./hall.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallComponent {
	@Input() hall?: IHall;
	@Input() actions?: IAction<HallEntity>[] | null;
}
