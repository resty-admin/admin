import { Clipboard } from "@angular/cdk/clipboard";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { environment } from "@env/environment";
import { ToastrService } from "@shared/ui/toastr";

@Component({
	selector: "app-statistic-access",
	templateUrl: "./statistic-access.component.html",
	styleUrls: ["./statistic-access.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticAccessComponent {
	@Input() code?: number | null;

	readonly telegramBots = [
		{
			label: environment.dev ? "@resty_dev_client_bot" : "@resty_client_bot",
			link: environment.dev ? "https://t.me/resty_dev_client_bot" : "https://t.me/resty_client_bot"
		},
		{
			label: environment.dev ? "@resty_dev_admin_bot" : "@resty_admin_bot",
			link: environment.dev ? "https://t.me/resty_dev_admin_bot" : "https://t.me/resty_admin_bot"
		}
	];

	constructor(private readonly _clipboard: Clipboard, private readonly _toastrService: ToastrService) {}

	copyCode(code: number) {
		this._clipboard.copy(code.toString());

		this._toastrService.success(undefined, { data: { title: "COPIED" } });
	}
}
