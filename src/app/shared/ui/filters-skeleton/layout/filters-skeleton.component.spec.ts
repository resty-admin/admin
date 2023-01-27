import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { FiltersSkeletonComponent } from "./filters-skeleton.component";

describe("FiltersComponent", () => {
	let component: FiltersSkeletonComponent;
	let fixture: ComponentFixture<FiltersSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FiltersSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(FiltersSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
