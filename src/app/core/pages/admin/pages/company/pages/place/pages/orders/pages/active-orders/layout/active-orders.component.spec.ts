import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { ActiveOrdersComponent } from "./active-orders.component";

describe("ActiveOrdersComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [ActiveOrdersComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ActiveOrdersComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
