import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { IosDatepickerComponent } from "./ios-datepicker.component";

describe("IosDatepickerComponent", () => {
	let component: IosDatepickerComponent;
	let fixture: ComponentFixture<IosDatepickerComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IosDatepickerComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(IosDatepickerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
