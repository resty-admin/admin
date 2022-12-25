import { TestBed } from "@angular/core/testing";

import { JwtGuard } from "./role.guard";

describe("JwtGuard", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [JwtGuard]
		}).compileComponents();
	});

	it("should create the guard", () => {
		const fixture = TestBed.createComponent(JwtGuard);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
