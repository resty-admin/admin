import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ToastrComponent } from "./toastr.component";

describe("ToastrComponent", () => {
	let component: ToastrComponent;
	let fixture: ComponentFixture<ToastrComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ToastrComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ToastrComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
