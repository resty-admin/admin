import { TestBed } from "@angular/core/testing";

import { RoleGuard } from "./role.guard";

describe("RoleGuard", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [RoleGuard]
		}).compileComponents();
	});

	it("should create the guard", () => {
		const fixture = TestBed.createComponent(RoleGuard);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
