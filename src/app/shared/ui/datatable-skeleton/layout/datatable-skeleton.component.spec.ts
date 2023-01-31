import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { DatatableSkeletonComponent } from "./datatable-skeleton.component";

describe("DatatableComponent", () => {
	let component: DatatableSkeletonComponent;
	let fixture: ComponentFixture<DatatableSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [DatatableSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(DatatableSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
