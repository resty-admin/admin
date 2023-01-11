import { TestBed } from "@angular/core/testing";

import { PaymentSystemDialogComponent } from "./payment-system-dialog.component";

describe("PaymentSystemDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [PaymentSystemDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PaymentSystemDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
