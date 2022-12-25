import { TestBed } from "@angular/core/testing";

import { ForgotPasswordComponent } from "./forgot-password.component";

describe("ForgotPasswordComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ForgotPasswordComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ForgotPasswordComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
