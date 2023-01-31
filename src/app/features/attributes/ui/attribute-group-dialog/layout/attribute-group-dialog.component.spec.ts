import { TestBed } from "@angular/core/testing";

import { AttributeGroupDialogComponent } from "./attribute-group-dialog.component";

describe("AttributeGroupDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AttributeGroupDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AttributeGroupDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
