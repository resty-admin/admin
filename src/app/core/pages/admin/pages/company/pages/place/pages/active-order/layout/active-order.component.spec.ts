import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ActiveOrderComponent } from "./active-order.component";

describe("OrderComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ActiveOrderComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ActiveOrderComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
