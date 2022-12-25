import { TestBed } from "@angular/core/testing";

import { AuthComponent } from "./auth.component";

describe("AuthComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [AuthComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(AuthComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
