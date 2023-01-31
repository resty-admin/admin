import { TestBed } from "@angular/core/testing";

import { PlaceDialogComponent } from "./place-dialog.component";

describe("PlaceDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [PlaceDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(PlaceDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
