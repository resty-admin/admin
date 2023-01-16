import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ProductsSelectComponent } from "./products-select.component";

describe("ProductsSelectComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ProductsSelectComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ProductsSelectComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
