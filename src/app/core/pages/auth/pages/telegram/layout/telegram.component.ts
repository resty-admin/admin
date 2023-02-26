import type { AfterViewInit, ElementRef } from "@angular/core";
import { ChangeDetectionStrategy, Component, ViewChild } from "@angular/core";

@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements AfterViewInit {
	@ViewChild("script", { static: true }) script: ElementRef | undefined;

	convertToScript() {
		// @ts-expect-error
		const element = this.script.nativeElement;
		const script = document.createElement("script");
		script.src = "https://telegram.org/js/telegram-widget.js?5";
		script.dataset["telegramLogin"] = "resty_admin_bot";
		script.dataset["size"] = "large";
		// Callback function in global scope
		// Callback function in global scope
		script.dataset["onauth"] = "loginViaTelegram(user)";
		script.dataset["requestAccess"] = "write";
		element.parentElement.replaceChild(script, element);
	}

	ngAfterViewInit() {
		this.convertToScript();
	}

	// constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}
	//
	// async ngOnInit() {
	// 	const value = this._routerService.getFragment();
	// 	const role = this._routerService.getQueryParams("role");
	//
	// 	if (!value) {
	// 		await this._routerService.navigate([ADMIN_ROUTES.SIGN_UP.absolutePath], { queryParamsHandling: "merge" });
	// 		return;
	// 	}
	//
	// 	const telegramUser = JSON.parse(new URLSearchParams(value).get("user") || "");
	//
	// 	this._authService
	// 		.telegram({ ...telegramUser, role })
	// 		.pipe(take(1))
	// 		.subscribe(async () => {
	// 			await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
	// 		});
	// }
}
