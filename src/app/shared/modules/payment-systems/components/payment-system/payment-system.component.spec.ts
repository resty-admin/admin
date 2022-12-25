import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { PaymentSystemComponent } from "./payment-system.component";

describe("PaymentSystemComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [PaymentSystemComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PaymentSystemComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
