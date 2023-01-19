import { TestBed } from "@angular/core/testing";

import { AddEmployeeDialogComponent } from "./add-employee-dialog.component";

describe("AddEmployeeDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AddEmployeeDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AddEmployeeDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
