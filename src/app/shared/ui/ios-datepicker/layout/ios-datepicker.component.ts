import type { AfterViewInit, OnChanges, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ControlValueAccessor } from "@shared/classes";
import { getControlValueAccessorProviders } from "@shared/functions";
import type { ISimpleChanges } from "@shared/interfaces";
import { SharedService } from "@shared/services";
import type { Dayjs } from "dayjs";
import * as dayjs from "dayjs";
import * as localeData from "dayjs/plugin/localeData";
import { combineLatest, debounceTime, distinctUntilChanged, fromEvent } from "rxjs";

dayjs.extend(localeData);

@UntilDestroy()
@Component({
	selector: "app-ios-datepicker",
	templateUrl: "./ios-datepicker.component.html",
	styleUrls: ["./ios-datepicker.component.scss"],
	providers: getControlValueAccessorProviders(IosDatepickerComponent),
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IosDatepickerComponent extends ControlValueAccessor<Dayjs> implements AfterViewInit, OnInit, OnChanges {
	@ViewChild("monthsContainer") monthsContainer!: ElementRef;
	@ViewChild("datesContainer") datesContainer!: ElementRef;
	@ViewChild("hoursContainer") hoursContainer!: ElementRef;
	@ViewChild("minutesContainer") minutesContainer!: ElementRef;

	@Input() isTableActive?: boolean | null = undefined;

	isDropdownOpen = false;

	isValid = false;
	isInvalid = false;

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

	constructor(readonly sharedService: SharedService, private readonly _changeDetectorReference: ChangeDetectorRef) {
		super(dayjs());
	}

	override ngOnChanges(changes: ISimpleChanges<IosDatepickerComponent>) {
		if (changes.isTableActive) {
			const isBoolean = typeof changes.isTableActive.currentValue === "boolean";

			this.isValid = Boolean(isBoolean && changes.isTableActive.currentValue);
			this.isInvalid = Boolean(isBoolean && !changes.isTableActive.currentValue);
		}

		super.ngOnChanges(changes);
	}

	toggleDropdown() {
		this.isDropdownOpen = !this.isDropdownOpen;
	}

	private _handleScroll({ nativeElement }: ElementRef, formControl: FormControl<number>) {
		fromEvent<Event>(nativeElement, "scroll")
			.pipe(untilDestroyed(this), debounceTime(50), distinctUntilChanged())
			.subscribe((event) => {
				if (!event || !event.target) {
					return;
				}

				const index = (<HTMLElement>event.target).scrollTop / this.height;
				const top = Math.round(index) * this.height;

				if (Number.isInteger(index)) {
					formControl.setValue(index);
				} else if ((<HTMLElement>event.target).scrollHeight - top === this.height * 7) {
					formControl.setValue(Math.round(index));
				} else {
					nativeElement.scrollTo({ top, behavior: "smooth" });
				}
			});
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
