import { TestBed } from "@angular/core/testing";

import { ProductDialogComponent } from "./product-dialog.component";

describe("ProductDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ProductDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(ProductDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
