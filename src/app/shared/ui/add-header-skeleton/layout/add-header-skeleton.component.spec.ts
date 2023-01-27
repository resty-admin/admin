import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { AddHeaderSkeletonComponent } from "./add-header-skeleton.component";

describe("FiltersComponent", () => {
	let component: AddHeaderSkeletonComponent;
	let fixture: ComponentFixture<AddHeaderSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AddHeaderSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AddHeaderSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
