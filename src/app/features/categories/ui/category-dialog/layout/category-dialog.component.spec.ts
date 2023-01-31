import { TestBed } from "@angular/core/testing";

import { CategoryDialogComponent } from "./category-dialog.component";

describe("CategoryDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CategoryDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CategoryDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
