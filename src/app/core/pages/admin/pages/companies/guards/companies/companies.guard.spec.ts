import { TestBed } from "@angular/core/testing";

import { CompaniesGuard } from "./companies.guard";

describe("RoleGuard", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [CompaniesGuard]
		}).compileComponents();
	});

	it("should create the guard", () => {
		const fixture = TestBed.createComponent(CompaniesGuard);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
