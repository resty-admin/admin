import type { AfterViewInit, OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, Input, ViewChild } from "@angular/core";
import { ANY_SYMBOL, THEME } from "@shared/constants";
import type { ISimpleChanges } from "@shared/interfaces";
import { NgProgressComponent } from "ngx-progressbar";

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

	className = `app-progress-bar ${THEME.replace(ANY_SYMBOL, this.theme)}`;

	ngAfterViewInit() {
		if (!this.progressBar) {
			return;
		}

		if (this.active) {
			this.progressBar.start();
		}
	}

	ngOnChanges(changes: ISimpleChanges<ProgressBarComponent>) {
		if (!this.progressBar) {
			return;
		}

		if (changes.theme) {
			this.className = `app-progress-bar ${THEME.replace(ANY_SYMBOL, changes.theme.currentValue)}`;
		}

		if (changes.active && changes.active.currentValue) {
			this.progressBar.start();
		} else {
			this.progressBar.complete();
		}
	}
}
