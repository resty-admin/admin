import { TestBed } from "@angular/core/testing";

import { UserDialogComponent } from "./user-dialog.component";

describe("UserDialogComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [UserDialogComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(UserDialogComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
