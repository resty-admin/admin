import { TestBed } from "@angular/core/testing";

import { AdminComponent } from "./admin.component";

describe("AdminComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AdminComponent]
		}).compileComponents();
	});

	it("should create the app", () => {
		const fixture = TestBed.createComponent(AdminComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
