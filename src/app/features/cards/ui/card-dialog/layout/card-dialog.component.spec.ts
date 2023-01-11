import { TestBed } from "@angular/core/testing";

import { CardDialogComponent } from "./card-dialog.component";

describe("CardDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CardDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CardDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
