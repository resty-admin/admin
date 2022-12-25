import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { IconComponent } from "./icon.component";

describe("IconComponent", () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [IconComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
