import { TestBed } from "@angular/core/testing";

import { AttributesGroupDialogComponent } from "./attributes-group-dialog.component";

describe("AttributesGroupDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AttributesGroupDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AttributesGroupDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
