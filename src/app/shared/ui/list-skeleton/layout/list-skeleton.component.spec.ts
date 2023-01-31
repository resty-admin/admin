import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ListSkeletonComponent } from "./list-skeleton.component";

describe("FiltersComponent", () => {
	let component: ListSkeletonComponent;
	let fixture: ComponentFixture<ListSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ListSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ListSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
