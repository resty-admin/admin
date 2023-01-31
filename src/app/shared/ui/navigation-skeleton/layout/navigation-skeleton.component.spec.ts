import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { NavigationSkeletonComponent } from "./navigation-skeleton.component";

describe("SkeletonComponent", () => {
	let component: NavigationSkeletonComponent;
	let fixture: ComponentFixture<NavigationSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [NavigationSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(NavigationSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
