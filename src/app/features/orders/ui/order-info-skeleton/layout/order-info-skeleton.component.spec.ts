import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { OrderInfoSkeletonComponent } from "./order-info-skeleton.component";

describe("OrderInfoComponent", () => {
	let component: OrderInfoSkeletonComponent;
	let fixture: ComponentFixture<OrderInfoSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OrderInfoSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(OrderInfoSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
