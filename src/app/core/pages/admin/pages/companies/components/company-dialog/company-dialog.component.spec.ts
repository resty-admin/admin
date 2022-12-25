import { TestBed } from "@angular/core/testing";

import { CompanyDialogComponent } from "./company-dialog.component";

describe("CompanyDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CompanyDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CompanyDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
