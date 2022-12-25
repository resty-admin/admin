import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PaymentSystemsComponent } from "./payment-systems.component";

describe("PaymentSystemsComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PaymentSystemsComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PaymentSystemsComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
