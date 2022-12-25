import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { OrdersComponent } from "./orders.component";

describe("OrdersComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [OrdersComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(OrdersComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
