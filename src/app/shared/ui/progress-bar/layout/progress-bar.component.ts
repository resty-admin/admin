import type { AfterViewInit, OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { NgProgressComponent } from "ngx-progressbar";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";
import type { ISimpleChanges } from "src/app/shared/interfaces";

import { IProgressBarTheme } from "../interfaces";

@Component({
	selector: "app-progress-bar",
	templateUrl: "./progress-bar.component.html",
	styleUrls: ["./progress-bar.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent implements OnChanges, AfterViewInit {
	@ViewChild(NgProgressComponent) progressBar?: NgProgressComponent;

	@Input() theme: IProgressBarTheme = "1";
	@Input() active = false;

	get className() {
		return `app-progress-bar ${THEME.replace(ANY_SYMBOL, this.theme)}`;
	}

	ngAfterViewInit() {
		if (!this.progressBar) {
			return;
		}

		if (this.active) {
			this.progressBar.start();
		}
	}

	ngOnChanges(changes: ISimpleChanges<ProgressBarComponent>) {
		if (!changes.active || !this.progressBar) {
			return;
		}

		if (changes.active.currentValue) {
			this.progressBar.start();
		} else {
			this.progressBar.complete();
		}
	}
}
