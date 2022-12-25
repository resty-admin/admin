import { TestBed } from "@angular/core/testing";

import { CommandDialogComponent } from "./command-dialog.component";

describe("CommandDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CommandDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(CommandDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
