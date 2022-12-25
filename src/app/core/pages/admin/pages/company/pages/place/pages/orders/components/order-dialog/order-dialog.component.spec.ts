import { TestBed } from "@angular/core/testing";

import { OrderDialogComponent } from "./order-dialog.component";

describe("OrderDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [OrderDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(OrderDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
