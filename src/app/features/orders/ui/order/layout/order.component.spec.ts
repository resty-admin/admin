import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { OrderComponent } from "./order.component";

describe("OrderInfoComponent", () => {
	let component: OrderComponent;
	let fixture: ComponentFixture<OrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [OrderComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(OrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
