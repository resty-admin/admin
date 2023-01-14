import type { OnChanges } from "@angular/core";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ANY_SYMBOL, THEME } from "src/app/shared/constants";

import type { ISimpleChanges } from "../../../interfaces";
import { ICounterTheme } from "../interfaces";

@Component({
	selector: "app-counter",
	templateUrl: "./counter.component.html",
	styleUrls: ["./counter.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnChanges {
	@Output() plusClicked = new EventEmitter();
	@Output() minusClicked = new EventEmitter();
	@Input() label = "";
	@Input() value? = 0;
	@Input() theme: ICounterTheme = "1";

	count = 0;
	className = `app-counter ${THEME.replace(ANY_SYMBOL, this.theme)} ${!this.count && "add"}`;

	setClassName(args?: { theme?: string; count?: number }) {
		this.className = `app-counter ${THEME.replace(ANY_SYMBOL, args?.theme || this.theme)} ${
			!(args?.count || this.count) && "add"
		}`;
	}

	ngOnChanges(changes: ISimpleChanges<CounterComponent>) {
		if (changes.theme) {
			this.setClassName({ theme: changes.theme.currentValue });
		}

		if (changes.value) {
			this.count = changes.value.currentValue || 0;
			this.setClassName({ count: this.count });
			this.className = `app-counter ${THEME.replace(ANY_SYMBOL, this.theme)} ${!this.count && "add"}`;
		}
	}

	emitPlusClick() {
		this.count++;
		this.setClassName({ count: this.count });
		this.plusClicked.emit();
	}

	emitMinusClick() {
		this.count--;
		this.setClassName({ count: this.count });
		this.minusClicked.emit();
	}
}
