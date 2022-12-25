import { TestBed } from "@angular/core/testing";

import { ResetPasswordComponent } from "./reset-password.component";

describe("ForgotPasswordComponent", () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [],
			declarations: [ResetPasswordComponent]
		}).compileComponents();
	});

	it("should create the component", () => {
		const fixture = TestBed.createComponent(ResetPasswordComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});
});
