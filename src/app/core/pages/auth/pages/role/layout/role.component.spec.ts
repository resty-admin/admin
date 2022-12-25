import { TestBed } from "@angular/core/testing";

import { RoleComponent } from "./role.component";

describe("RoleComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [RoleComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(RoleComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
