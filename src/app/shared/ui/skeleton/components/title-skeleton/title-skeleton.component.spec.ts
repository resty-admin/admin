import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { TitleSkeletonComponent } from "./title-skeleton.component";

describe("SkeletonComponent", () => {
	let component: TitleSkeletonComponent;
	let fixture: ComponentFixture<TitleSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [TitleSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(TitleSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
