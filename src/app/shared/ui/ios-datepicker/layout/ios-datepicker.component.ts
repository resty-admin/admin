import type { AfterViewInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { untilDestroyed } from "@ngneat/until-destroy";
import type { Dayjs } from "dayjs";
import * as dayjs from "dayjs";
import * as localeData from "dayjs/plugin/localeData";
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent } from "rxjs";
import { ControlValueAccessor } from "src/app/shared/classes";
import { getControlValueAccessorProviders } from "src/app/shared/functions";

dayjs.extend(localeData);

@Component({
	selector: "app-ios-datepicker",
	templateUrl: "./ios-datepicker.component.html",
	styleUrls: ["./ios-datepicker.component.scss"],
	providers: getControlValueAccessorProviders(IosDatepickerComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IosDatepickerComponent extends ControlValueAccessor<Dayjs> implements AfterViewInit {
	@ViewChild("monthsContainer") monthsContainer!: ElementRef;
	@ViewChild("datesContainer") datesContainer!: ElementRef;
	@ViewChild("hoursContainer") hoursContainer!: ElementRef;
	@ViewChild("minutesContainer") minutesContainer!: ElementRef;

	readonly height = 50;

	readonly monthFormControl = new FormControl<number>(dayjs().month());
	readonly dateFormControl = new FormControl<number>(dayjs().date() - 1);
	readonly hourFormControl = new FormControl<number>(dayjs().hour());
	readonly minuteFormControl = new FormControl<number>(Math.round(dayjs().minute() / 5));

	readonly months = dayjs.months();
	readonly dates: number[] = new Array(dayjs().daysInMonth()).fill(null).map((_, index) => index + 1);
	readonly hours = new Array(23).fill(null).map((_, index) => index);
	readonly minutes = new Array(12).fill(null).map((_, index) => index * 5);

	readonly wrapperStyle = {
		height: `${this.height * 6}px`
	};

	readonly listStyle = {
		padding: `${this.height * 2.5}px 0`
	};

	readonly listItemStyle = {
		height: `${this.height}px`
	};

	readonly activeItemStyle = {
		height: `${this.height}px`,
		top: `calc(50% - ${this.height / 2}px)`
	};

	constructor(private readonly _changeDetectorReference: ChangeDetectorRef) {
		super(dayjs());
	}

	private _handleScroll({ nativeElement }: ElementRef, formControl: FormControl<any>) {
		fromEvent(nativeElement, "scroll")
			.pipe(untilDestroyed(this), debounceTime(50), distinctUntilChanged())
			.subscribe((event: any) => {
				const index = event.target.scrollTop / this.height;
				const top = Math.round(index) * this.height;

				if (Number.isInteger(index)) {
					formControl.setValue(index);
				} else if (event.target.scrollHeight - top === this.height * 7) {
					formControl.setValue(Math.round(index));
				} else {
					nativeElement.scrollTo({ top, behavior: "smooth" });
				}
			});
	}

	trackByFn(index: number) {
		return index;
	}

	scrollTo(htmluListElement: HTMLUListElement, index: number) {
		htmluListElement.scrollTo({
			top: index * this.height,
			behavior: "smooth"
		});
	}

	ngAfterViewInit() {
		this._handleScroll(this.monthsContainer, this.monthFormControl);
		this._handleScroll(this.datesContainer, this.dateFormControl);
		this._handleScroll(this.hoursContainer, this.hourFormControl);
		this._handleScroll(this.minutesContainer, this.minuteFormControl);

		this.scrollTo(this.datesContainer.nativeElement, this.dateFormControl.value);
		this.scrollTo(this.monthsContainer.nativeElement, this.monthFormControl.value);
		this.scrollTo(this.hoursContainer.nativeElement, this.hourFormControl.value);
		this.scrollTo(this.minutesContainer.nativeElement, this.minuteFormControl.value);

		combineLatest([
			this.monthFormControl.value$,
			this.dateFormControl.value$,
			this.hourFormControl.value$,
			this.minuteFormControl.value$
		])
			.pipe(untilDestroyed(this))
			.subscribe(([monthIndex, dateIndex, hourIndex, minuteIndex]) => {
				const date = dayjs().month(monthIndex);
				const datesDiff = date.daysInMonth() - this.dates.length;

				if (datesDiff > 0) {
					this.dates.push(...new Array(datesDiff).fill(null).map((_, index) => this.dates.length + index + 1));
				} else if (datesDiff < 0) {
					this.dates.splice(datesDiff);
				}

				this.formControl.setValue(
					date.date(this.dates[dateIndex]).hour(this.hours[hourIndex]).minute(this.minutes[minuteIndex])
				);

				this._changeDetectorReference.detectChanges();
			});
	}
}
