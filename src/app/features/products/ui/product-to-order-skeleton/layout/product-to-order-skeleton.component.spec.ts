import type { ComponentFixture } from "@angular/core/testing";
import { TestBed } from "@angular/core/testing";

import { ProductToOrderSkeletonComponent } from "./product-to-order-skeleton.component";

describe("ProductToOrderComponent", () => {
	let component: ProductToOrderSkeletonComponent;
	let fixture: ComponentFixture<ProductToOrderSkeletonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ProductToOrderSkeletonComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(ProductToOrderSkeletonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
