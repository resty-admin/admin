import { TestBed } from "@angular/core/testing";

import { AttributeDialogComponent } from "./attribute-dialog.component";

describe("AttributeDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AttributeDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AttributeDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
