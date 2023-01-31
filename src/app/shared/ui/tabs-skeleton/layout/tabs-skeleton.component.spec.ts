import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { TabsSkeletonComponent } from "./tabs-skeleton.component";

describe("FiltersComponent", () => {
	let component: TabsSkeletonComponent;
	let fixture: ComponentFixture<TabsSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TabsSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TabsSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
