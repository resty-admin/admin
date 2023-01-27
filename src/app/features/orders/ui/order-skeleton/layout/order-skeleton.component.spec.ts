import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { OrderSkeletonComponent } from "./order-skeleton.component";

describe("OrderInfoComponent", () => {
	let component: OrderSkeletonComponent;
	let fixture: ComponentFixture<OrderSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OrderSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(OrderSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
