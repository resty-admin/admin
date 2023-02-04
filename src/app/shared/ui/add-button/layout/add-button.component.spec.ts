import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { AddButtonComponent } from "./add-button.component";

describe("ButtonComponent", () => {
	let component: AddButtonComponent;
	let fixture: ComponentFixture<AddButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddButtonComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AddButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
