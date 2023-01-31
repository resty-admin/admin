import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ProductToOrderComponent } from "./product-to-order.component";

describe("ProductToOrderComponent", () => {
	let component: ProductToOrderComponent;
	let fixture: ComponentFixture<ProductToOrderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductToOrderComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductToOrderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
