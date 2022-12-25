import { TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AuthGuard]
		}).compileComponents();
	});

	it("should create the guard", () => {
		const fixture = TestBed.createComponent(AuthGuard);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
