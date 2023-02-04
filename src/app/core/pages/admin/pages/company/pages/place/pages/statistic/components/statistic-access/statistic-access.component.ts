import { Clipboard } from "@angular/cdk/clipboard";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { ToastrService } from "@shared/ui/toastr";

@Component({
	selector: "app-statistic-access",
	templateUrl: "./statistic-access.component.html",
	styleUrls: ["./statistic-access.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticAccessComponent {
	@Input() code?: number | null;

	constructor(private readonly _clipboard: Clipboard, private readonly _toastrService: ToastrService) {}

	copyCode(code: number) {
		this._clipboard.copy(code.toString());

		this._toastrService.success(undefined, { data: { title: "COPIED" } });
	}
}
