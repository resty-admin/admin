import { TestBed } from "@angular/core/testing";

import { HallDialogComponent } from "./hall-dialog.component";

describe("HallDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [HallDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(HallDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
