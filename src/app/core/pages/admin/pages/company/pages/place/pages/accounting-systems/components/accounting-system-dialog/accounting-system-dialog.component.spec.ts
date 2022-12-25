import { TestBed } from "@angular/core/testing";

import { AccountingSystemDialogComponent } from "./accounting-system-dialog.component";

describe("AccountingSystemDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AccountingSystemDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AccountingSystemDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
